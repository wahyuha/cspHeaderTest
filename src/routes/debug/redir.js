import { basePath } from "@constants/url";
import loggertdr from "@server/utils/loggertdr";

export async function get(req, res) {
  let location = "";
  try {
    location = `${basePath}/debug/ok`;
  } catch (error) {
    loggertdr.info(JSON.stringify(error));
    location = `${basePath}/debug/wrong.js`;
  }

  res.writeHead(302, {
    location,
  });
  res.end();
}
