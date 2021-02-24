export const cookieConfig = {
  path: "/",
  maxAge: 600000,
  httpOnly: true,
  secure: false,
  SameSite: "strict",
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

export const cookieName = {
  rid: "req",
  trans: "tid",
};
