import { Request, Response } from "express";
import { steamKey } from "../utils/configurator";

const profile = async (req: Request, res: Response) => {
  let response: {
    success: boolean;
    steamid: string | undefined;
    error: {} | null | string;
  } = {
    success: false,
    error: {},
    steamid: undefined,
  };
  let profileAddress = req.params.id;

  if (
    profileAddress &&
    (profileAddress.match("/profiles/") || profileAddress.match("/id/"))
  ) {
    try {
      let steamId;
      let split = profileAddress.split("/");
      split = split.filter((arrayItem) => arrayItem != "");
      if (split[split.length - 2] === "profiles") {
        steamId = split[split.length - 1];
        response = {
          success: true,
          steamid: dec2hex(steamId),
          error: null,
        };
        res.status(200).send(response);
      } else {
        let vanityUrl = split[split.length - 1];
        fetch(
          `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamKey}&vanityurl=${vanityUrl}`
        )
          .then((resp) => resp.json())
          .then((json) => {
            if (json && json.response.steamid) {
              response = {
                success: true,
                steamid: dec2hex(json.response.steamid),
                error: null,
              };
              res.status(200).send(response);
            } else {
              response.error = "Profil nenalezen.";
              res.status(500).send(response);
            }
          })
          .catch((error) => {
            console.log(error);
            response.error = "Nepodařilo se načíst profil.";
            res.status(500).send(response);
          });
      }
    } catch (error) {
      console.log(error);
      response.error = "Nepodařilo se načíst profil.";
      res.status(500).send(response);
    }
  } else {
    response.error = "Nesprávná URL profilu.";
    res.status(500).send(response);
  }
};

function dec2hex(data: string) {
  let dec = data.toString().split(""),
    sum: any[] = [],
    hex = [],
    i,
    s;
  while (dec.length) {
    let shift: any = dec.shift();
    s = 1 * shift;
    for (i = 0; s || i < sum.length; i++) {
      s += (sum[i] || 0) * 10;
      sum[i] = s % 16;
      s = (s - sum[i]) / 16;
    }
  }
  while (sum.length) {
    hex.push(sum.pop().toString(16));
  }
  return hex.join("");
}

export default { profile };
