import { Request, Response } from "express";
import { cache } from "../services/history";

const history = async (_req: Request, res: Response) => {
  return res.status(200).send(cache);
};

export default { history };
