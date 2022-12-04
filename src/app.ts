import app from "express";
import axios from "axios";
import routes from "./routes/router";
import { cachePlayers, updater as statusUpdater } from "./services/status";
import { appPort } from "./utils/configurator";
import logger from "./utils/logger";

const port = appPort;
const httpServer = app();

httpServer.use("/", routes);

httpServer.use((_req, res, _next) => {
  const error = new Error("Path not found.");
  return res.status(404).json({
    message: error.message,
  });
});

httpServer.listen(port, () => {
  logger.info(`APP | Started http-server on port ${port}`);
});

cachePlayers();
statusUpdater();
/*
let last = 0;
function get() {
  axios
    .get(`http://main.tror.eu/players.json`)
    .then((res) => {
      //logger.info("Sending request...");
      if (res.data.length < 1) {
        logger.warn(`Waiting 1 second before another request... ${last}`);
        setTimeout(get, 1000);
        return;
      } else {
        last++;
        logger.info(`Request successfully sent. ${last}`);
      }
      //logger.info(res.data);
      get();
    })
    .catch((error) => logger.error(error));
}
*/
