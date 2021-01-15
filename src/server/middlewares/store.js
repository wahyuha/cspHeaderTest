import session from "express-session";
import sessionFileStore from "session-file-store";

let store;

const FileStore = new sessionFileStore(session);
store = new FileStore({
  path: '.sessions',
  ttl: 1800,
});

export const cookieConfig = {
  path: "/",
  maxAge: 60 * 60 * 1000,
  // httpOnly: true,
  // secure: sessionEnv.cookie.secure,
  // SameSite: "strict",
};

export const sessionStore = {
  secret: 'kocheng',
  resave: false,
  name: 'dd',
  saveUninitialized: false,
  unset: "destroy",
  cookie: cookieConfig,
  store: store,
};