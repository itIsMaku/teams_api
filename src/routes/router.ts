import express, { Request, Response } from "express";
import profileController from "../controllers/profile";
import statusController from "../controllers/status";
import storageController from "../controllers/storage";
import historyController from "../controllers/history";

import {
  historyEndpoint,
  imagesEndpoints,
  profileEndpoint,
  statusEndpoints,
} from "../utils/configurator";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "Operational." });
});

router.get(statusEndpoints.long.endpoint, statusController.status);
router.get(statusEndpoints.short.endpoint, statusController.statusShort);

router.get(profileEndpoint, profileController.profile);

router.get(imagesEndpoints.inventory, storageController.inventory);
router.get(imagesEndpoints.vehicles, storageController.vehicles);

router.get(historyEndpoint, historyController.history);

export = router;
