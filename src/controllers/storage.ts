import { Request, Response } from "express";
import { getImage } from "../services/storage";

const inventory = async (req: Request, res: Response) => {
  return res.status(200).sendFile(getImage("inventory", req.params.name));
};

const vehicles = async (req: Request, res: Response) => {
  return res.status(200).sendFile(getImage("vehicles", req.params.name));
};

export default { inventory, vehicles };
