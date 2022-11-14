import app from "express";
import routes from "./routes/router";
import { cachePlayers, updater as statusUpdater } from "./services/status";
import { appPort } from "./utils/configurator";
import logger from "./utils/logger";
import cors from "cors";
import { cacheHistory, updater as historyUpdater } from "./services/history";

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

/* 
  httpServer.use(
    cors({
      origin: [
        "https://rules.tror.eu",
        "https://localhost:44408",
        "http://localhost:5000",
        "https://web.tror.cf",
        "https://tror.eu",
      ],
    })
  );
*/
cachePlayers();
statusUpdater();
cacheHistory();
historyUpdater();
