const cookieSession = {
  name: 'dd',
  secure: false,
  maxAge: 1800000,
};

export const sessionEnv = {
  secret: 'kocheng',
  cookie: cookieSession,
};

export const cookieName = {
  rid: 'req',
  trans: 'tid',
};