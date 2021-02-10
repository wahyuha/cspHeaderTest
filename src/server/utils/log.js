import loggertdr from "@server/utils/loggertdr";
import {
  logProcess,
  logStartProcess,
  logEndProcess,
} from "@constants/logger";

const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");
const mapMetadata = new Map();

const intruder = "intruders";
const appname = "kiluan";

export const ts = (rid, tid, tag, path, msg) => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid ? tid : intruder,
    tag: tag,
    domain: path.domain,
    path: path.pathname,
    logTime: logTime.toISOString(),
    datas: msg,
  };

  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.set(tid, logTime);
};

export const te = (rid, tid, tag, path, msg) => {
  let logStartTime = mapMetadata.get(tid);
  let logTime = new Date();
  let diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  let messageLog = {
    requestId: rid,
    transId: tid ? tid : intruder,
    tag: tag,
    domain: path.domain,
    path: path.pathname,
    logTime: logTime.toISOString(),
    responseTime: diff,
    datas: msg,
  };

  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.delete(tid);
};

export const tdr = (rid, tid, path, msg) => {
  const logStartTime = mapMetadata.get(tid);
  const logTime = new Date();
  const diff = Math.abs(logTime - logStartTime); // difference in milliseconds
  let messageLog = {
    requestId: rid,
    transId: tid ? tid : intruder,
    port: process.env.PORT || 3010,
    logTime: logTime.toISOString(),
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

export const tp = (rid, tid, pname, msg) => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid,
    tag: logProcess,
    processName: pname,
    datas: msg,
    logTime: logTime.toISOString(),
  };

  loggertdr.info(JSON.stringify(messageLog));
  
};

export const tps = (rid, tid, pname, msg) => {
  let logTime = new Date();
  let messageLog = {
    requestId: rid,
    transId: tid ? tid : intruder,
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
    transId: tid ? tid : intruder,
    tag: logEndProcess,
    processName: pname,
    logTime: logTime.toISOString(),
    responseTime: diff,
    datas: msg,
  };
  
  loggertdr.info(JSON.stringify(messageLog));

  mapMetadata.delete(tid);
};
