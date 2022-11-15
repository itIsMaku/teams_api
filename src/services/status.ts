import axios from "axios";
import { servers } from "../utils/configurator";
import logger from "../utils/logger";

export const cache: { [key: string]: {} } = {};

export function cachePlayers() {
  logger.info("STATUS | Caching players...");
  Object.keys(servers).forEach((key) => {
    let adress = servers[key];
    let data;
    axios
      .get(`http://${adress}/dynamic.json`)
      .then((res) => {
        data = res.data;
        let players = data.clients;
        let maxPlayers = data.sv_maxclients;
        cache[key] = {
          players: players,
          maxPlayers: maxPlayers,
          queue: -1,
        };
        axios
          .get(`http://${adress}/info.json`)
          .then((res) => {
            data = res.data;
            let queue = 0;
            if (data.vars.queue) {
              queue = JSON.parse(data.vars.queue).length;
            }
            cache[key] = {
              players: players,
              maxPlayers: maxPlayers,
              queue: queue,
            };
          })
          .catch((error) => catchError(key, error));
      })
      .catch((error) => catchError(key, error));
  });
}

function catchError(key: string, error: any) {
  logger.error(error);
  cache[key] = {
    players: "offline",
    maxPlayers: "offline",
    queue: "offline",
  };
}

export function updater() {
  setTimeout(() => {
    cachePlayers();
    updater();
  }, 30 * 1000);
}
