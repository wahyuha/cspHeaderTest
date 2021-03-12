export const cookieConfig = {
  path: "/",
  maxAge: parseInt(process.env.SESSION_TTL || 1800) * 100,
  httpOnly: true,
  secure: false,
  SameSite: "strict",
};
