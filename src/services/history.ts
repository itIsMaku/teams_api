import path from "path";
import { txDataDir } from "../utils/configurator";
import logger from "../utils/logger";
import fs from "fs";

export let cache: {
  ts: any;
  cl: any;
}[] = [];

export function cacheHistory() {
  logger.info("HISTORY | Caching history chart...");
  let file = path.resolve(txDataDir, "/default/data/stats_heatmapData_v1.json");
  if (!fs.existsSync(file)) return;
  cache = [];
  let dateSince = new Date();
  dateSince.setDate(dateSince.getDate() - 1);

  let rawdata = fs.readFileSync(file);
  let data = JSON.parse(rawdata.toString());

  data.forEach((item: { ts: number; clients: any }) => {
    if (item.ts > +dateSince) {
      cache.push({
        ts: item.ts,
        cl: item.clients,
      });
    }
  });
}

export function updater() {
  setTimeout(() => {
    cacheHistory();
    updater();
  }, 60000 * 10);
}
