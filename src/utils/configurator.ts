import config from "../../config.json";

export const appPort = config.app_port ?? 8080;
export const steamKey = config.steam_key;
export const statusEndpoints: { [key: string]: any } = config.status_endpoints;
export const profileEndpoint = config.profile_endpoint;
export const imagesEndpoints = config.images_endpoints;
export const historyEndpoint = config.history_endpoint;
export const serverIp = config.server_ip ?? "main.tror.eu";
export const txDataDir = config.txDataDir;
