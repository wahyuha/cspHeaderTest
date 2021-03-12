export const sessionOptions = {
  storeType: process.env.SESSION_STORE_TYPE || "file",
  name: process.env.SESSION_NAME || "_dd",
  secret: process.env.SESSION_SECRET || "kocheng",
  ttl: parseInt(process.env.SESSION_TTL || 1800),
};

export const sessionRedis = {
  host: process.env.SESSION_REDIS_HOST,
  port: process.env.SESSION_REDIS_PORT,
  password: process.env.SESSION_REDIS_PASSWORD,
  prefix: process.env.SESSION_REDIS_PREFIX,
};

export const sessionFile = {
  path: process.env.SESSION_FILE_PATH || ".sessions",
};
