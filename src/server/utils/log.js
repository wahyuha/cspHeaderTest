import loggertdr from "@server/utils/loggertdr";
import logger from "@server/utils/logger";
import { logProcess, logStartProcess, logEndProcess } from "@constants/logger";

const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");
const mapMetadata = new Map();

const intruder = "intruders";
const appname = "sempu";

export const ts = (rid, tid, tag, path, msg, logType = "") => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid || intruder,
    tag: tag,
    logType,
    domain: path.domain,
    path: path.pathname,
    logTime: logTime.toISOString(),
    datas: msg,
  };

  if (logType === "SYS") {
    logger.info(JSON.stringify(messageLog));
  } else {
    loggertdr.info(JSON.stringify(messageLog));
  }

  mapMetadata.set(tid, logTime);
};

export const te = (rid, tid, tag, path, msg, logType = "") => {
  let logStartTime = mapMetadata.get(tid);
  let logTime = new Date();
  let diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  let messageLog = {
    requestId: rid,
    transId: tid || intruder,
    tag: tag,
    logType,
    domain: path.domain,
    path: path.pathname,
    logTime: logTime.toISOString(),
    responseTime: diff,
    datas: msg,
  };

  if (logType === "SYS") {
    logger.info(JSON.stringify(messageLog));
  } else {
    loggertdr.info(JSON.stringify(messageLog));
  }

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

  if (logType === "SYS") {
    logger.info(JSON.stringify(messageLog));
  } else {
    loggertdr.info(JSON.stringify(messageLog));
  }
};

export const tp = (rid, tid, pname, msg, logType = "") => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid,
    tag: logProcess,
    logType,
    processName: pname,
    datas: msg,
    logTime: logTime.toISOString(),
  };

  if (logType === "SYS") {
    logger.info(JSON.stringify(messageLog));
  } else {
    loggertdr.info(JSON.stringify(messageLog));
  }
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
