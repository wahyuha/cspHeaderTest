import { v4 as uuidv4 } from "uuid";
import loggertdr from "@server/utils/loggertdr";
import logger from "@server/utils/logger";
import { logProcess, logStartProcess, logEndProcess } from "@constants/logger";

const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");
const mapMetadata = new Map();

const intruder = "intruders";
const appname = "sempu";

export const ts = (tid) => {
  let logTime = new Date();
  mapMetadata.set(tid, logTime);
};

export const te = (tid, tag, path, headers, req, resp, method) => {
  let logStartTime = mapMetadata.get(tid);
  let logTime = new Date();
  let diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  console.log(logTime, logStartTime);
  const requestId = uuidv4();
  let messageLog = {
    requestId,
    transId: tid || intruder,
    // tag: tag,
    headers,
    logType: "TDR",
    domain: path.domain,
    path: path.pathname,
    logTime: logTime.toISOString(),
    responseTime: diff,
    req,
    resp,
    method,
    error: "",
  };

  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.delete(tid);
};

export const tdr = (rid, tid, path, msg, logType = "") => {
  const logStartTime = mapMetadata.get(tid);
  const logTime = new Date();
  const diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  let messageLog = {
    requestId: rid,
    transId: tid || intruder,
    port: process.env.PORT || 3010,
    logTime: logTime.toISOString(),
    logType,
    app: appname,
    ver: "v1",
    domain: path.domain,
    path: path.pathname,
    responseTime: diff,
    header: msg.headers,
    req: msg.request,
    resp: msg.response,
  };

  loggertdr.info(JSON.stringify(messageLog));
};

export const tp = (pname, msg, req) => {
  const session = req.session || {};
  const rid = session.requestId;
  const tid = session.tid;

  let logTime = new Date();
  const config = msg.config || {};
  delete msg.config;
  const url = config.url || "";
  const headers = config.headers || {};
  delete config.url;
  delete config.headers;
  let messageLog = {
    requestId: rid,
    transId: tid,
    tag: logProcess,
    processName: pname,
    config,
    url,
    headers,
    datas: msg,
    logTime: logTime.toISOString(),
  };

  logger.info(JSON.stringify(messageLog));
};

export const tps = (rid, tid, pname, msg) => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid || intruder,
    tag: logStartProcess,
    processName: pname,
    logTime: logTime.toISOString(),
    datas: msg,
  };

  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.set(tid, logTime);
};

export const tpe = (rid, tid, pname, msg) => {
  let logStartTime = mapMetadata.get(tid);
  let logTime = new Date();
  let diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  let messageLog = {
    requestId: rid,
    transId: tid || intruder,
    tag: logEndProcess,
    processName: pname,
    logTime: logTime.toISOString(),
    responseTime: diff,
    datas: msg,
  };

  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.delete(tid);
};
