import session from "express-session";
import sessionFileStore from "session-file-store";
import { cookieConfig } from "@server/utils/env";

const sessionSecret = process.env.SESSION_SECRET || "kocheng";
const sessionName = process.env.SESSION_NAME || "dd";

let store;

const FileStore = new sessionFileStore(session);
store = new FileStore({
  path: ".sessions",
  ttl: 600,
});

export const sessionStore = {
  secret: sessionSecret,
  resave: false,
  name: sessionName,
  saveUninitialized: false,
  unset: "destroy",
  cookie: cookieConfig,
  store: store,
};
