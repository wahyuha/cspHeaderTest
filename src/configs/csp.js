const cspEnv = {
  defaultSrc: process.env.CSP_DEFAULT_SRC ? process.env.CSP_DEFAULT_SRC.split(",") : "self", 
  connectSrc: process.env.CSP_CONNECT_SRC ? process.env.CSP_CONNECT_SRC.split(",") : "self", 
  scriptSrc: process.env.CSP_SCRIPT_SRC ? process.env.CSP_SCRIPT_SRC.split(",") : "self", 
  imgSrc: process.env.CSP_IMAGE_SRC ? process.env.CSP_IMAGE_SRC.split(",") : "self", 
  styleSrc: process.env.CSP_STYLE_SRC ? process.env.CSP_STYLE_SRC.split(",") : "self", 
  fontSrc: process.env.CSP_FONT_SRC ? process.env.CSP_FONT_SRC.split(",") : "self", 
  objectSrc: process.env.CSP_OBJECT_SRC ? process.env.CSP_OBJECT_SRC.split(",") : "none", 
}

export const cspConfig = {
  directives: {
    "default-src": cspEnv.defaultSrc,
    "connect-src": cspEnv.connectSrc,
    "script-src": cspEnv.scriptSrc,
    "img-src": cspEnv.imgSrc,
    "style-src": cspEnv.styleSrc,
    "font-src": cspEnv.fontSrc,
    "object-src": cspEnv.objectSrc,
  },
};
