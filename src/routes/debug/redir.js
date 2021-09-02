import { basePath } from "@constants/url";
import loggertdr from "@server/utils/loggertdr";

export async function get(req, res) {
  try {
    res.writeHead(302, {
      location: `${basePath}/debug/ok`,
    });
    res.end();
    // res.redirect(302, `${basePath}/debug/ok`);
    // return false;
  } catch (error) {
    loggertdr.info(JSON.stringify(error));
    res.writeHead(302, {
      location: `${basePath}/debug/wrong.js`,
    });
    res.end();
    // res.redirect(302, `${basePath}/debug/wrong.js`);
    // return false;
  }
}
