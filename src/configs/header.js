const cspEnv = {
  defaultSrc: process.env.CSP_DEFAULT_SRC
    ? process.env.CSP_DEFAULT_SRC.split(",")
    : "self",
  connectSrc: process.env.CSP_CONNECT_SRC
    ? process.env.CSP_CONNECT_SRC.split(",")
    : "self",
  scriptSrc: process.env.CSP_SCRIPT_SRC
    ? process.env.CSP_SCRIPT_SRC.split(",")
    : "self",
  imgSrc: process.env.CSP_IMAGE_SRC
    ? process.env.CSP_IMAGE_SRC.split(",")
    : "self",
  styleSrc: process.env.CSP_STYLE_SRC
    ? process.env.CSP_STYLE_SRC.split(",")
    : "self",
  fontSrc: process.env.CSP_FONT_SRC
    ? process.env.CSP_FONT_SRC.split(",")
    : "self",
  objectSrc: process.env.CSP_OBJECT_SRC
    ? process.env.CSP_OBJECT_SRC.split(",")
    : "none",
};

const corsEnv = {
  origin: process.env.CORS_ORIGIN.split(","),
};

export const cspConfig = {
  directives: {
    "default-src": cspEnv.defaultSrc,
    "connect-src": cspEnv.connectSrc,
    "script-src": cspEnv.scriptSrc,
    "img-src": cspEnv.imgSrc,
    "font-src": cspEnv.fontSrc,
    "object-src": cspEnv.objectSrc,
  },
};

export const corsConfig = {
  origin: corsEnv.origin,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "Authorization",
    "Access-Control-Allow-Origin",
    "token",
    "Content-Type",
    "Accept",
    "Content-Length",
    "Accept-Encoding",
    "X-CSRF-Token",
    "Authorization",
    "s",
  ],
  exposedHeaders: ["Content-Length", "Access-Control-Allow-Origin"],
  credentials: true,
};
