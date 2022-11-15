import config from "../../config.json";

export const appPort = config.app_port ?? 8080;
export const servers: { [key: string]: string } = config.servers ?? {
  mnrp: "wl.mnrp.cz:30120",
  tror: "main.tror.eu",
};
