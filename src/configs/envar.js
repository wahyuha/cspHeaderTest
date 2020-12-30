const dotenv = require('dotenv');

const loadDotEnv = () => {
  dotenv.config();
  const targetPrefix = 'process.env.';

  const ENV_VARS = {};
  for (let key in process.env) {
    ENV_VARS[targetPrefix + key] = ("'" + process.env[key] + "'");
  }
  return ENV_VARS;
}

export default loadDotEnv;
