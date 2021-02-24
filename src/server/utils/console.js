import { ts, te, tp, tdr } from "@server/utils/log";

export const initDebugLog = () => {
  console.start = console.log;
  console.end = console.log;
  console.process = console.log;
  console.tdr = console.log;
};

export const enableDebugLog = () => {
  console.start = ts;
  console.end = te;
  console.process = tp;
  console.tdr = tdr;
};

export const disableDebugLog = () => {
  console.log = function () {};
  console.start = function () {};
  console.end = function () {};
  console.process = function () {};
  console.tdr = function () {};
};
