import express, { Request, Response } from "express";
import statusController from "../controllers/status";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "Operational." });
});

router.get("/servers", statusController.status);

export = router;
