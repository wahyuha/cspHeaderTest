import session from "express-session";
import sessionFileStore from "session-file-store";
import { cookieConfig } from "@configs/cookie";
import { sessionOptions, sessionFile } from "@configs/session";

let store;
const FileStore = new sessionFileStore(session);
store = new FileStore({
  path: sessionFile.path,
  ttl: sessionOptions.ttl,
});

export const sessionConfig = {
  secret: sessionOptions.secret,
  resave: false,
  name: sessionOptions.name,
  saveUninitialized: false,
  unset: "destroy",
  cookie: cookieConfig,
  store,
};
