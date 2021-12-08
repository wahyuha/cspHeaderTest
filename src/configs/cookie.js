export const cookieConfig = {
  path: "/",
  maxAge: parseInt(process.env.SESSION_TTL || 1800) * 1000,
  httpOnly: true,
  secure: false,
  SameSite: "strict",
};
