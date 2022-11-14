import { Request, Response } from "express";
import { cache } from "../services/status";

const status = async (_req: Request, res: Response) => {
  return res.status(200).send(cache.long);
};

const statusShort = async (_req: Request, res: Response) => {
  return res.status(200).send(cache.short);
};

export default { status, statusShort };
