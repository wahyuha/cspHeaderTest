import axios from 'axios';

const serverHttp = (req, res) => {
  const instance = axios.create({
    baseURL: 'http://prahu-svc.linkaja.dev',
    timeout: 1000,
    headers: {
      'X-Request-ID': '01ERY9050186RN1VRTQZTA76BX'
    }
  });

  return instance;
}

export const clientHttp = (req, res) => {
  const clientBaseURL = 'http://localhost:5000/';
  const instance = axios.create({
    baseURL: clientBaseURL,
    timeout: 1000,
    headers: {}
  });

  return instance;
}

export default serverHttp;
