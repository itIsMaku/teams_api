import axios from "axios";
import { statusEndpoints as endpoints, serverIp } from "../utils/configurator";
import logger from "../utils/logger";

export const cache: { [key: string]: string } = {
  long: endpoints.long.default,
  short: endpoints.short.default,
};

export function cachePlayers() {
  logger.info("STATUS | Caching players...");
  axios
    .get(`https://${serverIp}/dynamic.json`)
    .then((response) => {
      let data = response.data;
      let players = data.clients;
      let maxPlayers = data.sv_maxclients;
      axios
        .get(`https://${serverIp}/info.json`)
        .then((response) => {
          data = response.data;
          let queueAddon = "";
          if (data.vars.queue) {
            let queueSize = JSON.parse(data.vars.queue).length;
            if (queueSize > 0) {
              queueAddon = ` [${queueSize}]`;
            }
          }
          Object.keys(cache).forEach((key) => {
            cache[key] = `${endpoints[key].formatted
              .replace("%1", players)
              .replace("%2", maxPlayers)
              .replace("%3", queueAddon)}`;
          });
        })
        .catch((error) => catchError(error));
    })
    .catch((error) => catchError(error));
}

function catchError(error: any) {
  logger.error(error);
  Object.keys(cache).forEach((key) => {
    cache[key] = `${endpoints[key].default}`;
  });
}

export function updater() {
  setTimeout(() => {
    cachePlayers();
    updater();
  }, 30 * 1000);
}
