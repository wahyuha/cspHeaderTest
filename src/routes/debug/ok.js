import loggertdr from "@server/utils/loggertdr";

export async function get(req, res) {
  loggertdr.info(JSON.stringify({ state: "init-redirect", message: "" }));
  res.json({ data: "Success redirect", status: "00" });
}
