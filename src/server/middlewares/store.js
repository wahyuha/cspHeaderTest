import session from "express-session";
import sessionFileStore from "session-file-store";
import { cookieConfig } from "@server/middlewares/cookieConfig";

let store;

const FileStore = new sessionFileStore(session);
store = new FileStore({
  path: '.sessions',
  ttl: 1800,
});

export const sessionStore = {
  secret: 'kocheng',
  resave: false,
  name: 'dd',
  saveUninitialized: false,
  unset: "destroy",
  cookie: cookieConfig,
  store: store,
};