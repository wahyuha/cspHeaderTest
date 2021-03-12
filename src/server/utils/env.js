export const cookieName = {
  main: process.env.SESSION_NAME || "_dd",
  rid: "req",
  trans: "tid",
};

export const cookieConfigRemove = {
  path: "/",
  maxAge: 0,
  expires: new Date(0),
  overwrite: true,
  httpOnly: true,
  secure: false,
  SameSite: "strict",
};
