import { v2 } from "cloudinary";
import { unlinkSync } from "node:fs";
import { join } from "node:path"
import { v4 as uuidv4 } from 'uuid';
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDFLARE,
  api_secret: process.env.API_SECRET
});
export default async function (namePath: number) {
  const uniqueName = uuidv4();
  try {
    const path = join(__dirname, `./img/${namePath}.jpg`)
    const res = await v2.uploader.upload(path, { public_id: uniqueName })
    unlinkSync(path)
    return res.url
  } catch (err) {
    return null
  }
}