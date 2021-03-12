import session from "express-session";
import sessionFileStore from "session-file-store";
import redis from "redis";
import connectRedis from "connect-redis";
import { cookieConfig } from "@configs/cookie";
import { sessionOptions, sessionFile, sessionRedis } from "@configs/session";

let store;
if (sessionOptions.storeType === "redis") {
  const RedisStore = connectRedis(session);
  const config = {
    host: sessionRedis.host,
    port: sessionRedis.port,
  };
  if (sessionRedis.password) {
    config.password = sessionRedis.password;
  }
  var redisClient = redis.createClient(config);
  store = new RedisStore({
    client: redisClient,
    prefix: sessionRedis.prefix,
    ttl: sessionOptions.ttl,
  });
} else {
  const FileStore = new sessionFileStore(session);
  store = new FileStore({
    path: sessionFile.path,
    ttl: sessionOptions.ttl,
  });
}

export const sessionConfig = {
  secret: sessionOptions.secret,
  resave: false,
  name: sessionOptions.name,
  saveUninitialized: false,
  unset: "destroy",
  cookie: cookieConfig,
  store,
};
