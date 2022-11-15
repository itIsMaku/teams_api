import { Request, Response } from "express";
import { cache } from "../services/status";

const status = async (_req: Request, res: Response) => {
  return res.status(200).send(cache);
};
export default { status };
