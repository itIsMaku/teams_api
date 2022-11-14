import path from "path";
import fs from "fs";

export function getImage(type: string, name: string) {
  let images = path.resolve(__dirname, "../../images/");
  let file = path.resolve(images, `./${type}/${name}.png`);
  if (name && fs.existsSync(file)) {
    return file;
  }
  return path.resolve(images, "./no-image.png");
}
