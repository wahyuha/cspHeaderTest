import axios from "axios";
import { apiUrlClient } from "@constants/url";
import { decrypt, encrypt } from "@utils/cryptoClient";

class httpClient {
  constructor(session) {
    this.apiUrl;
    this.headers;
    this.instance;
    this.session = session;
    this.timeout = 120000;

    this.createApiUrl()
      .createHeaders()
      .createInstance()
      .requestInterceptor()
      .responseInterceptor();
  }

  createApiUrl() {
    this.apiUrl = apiUrlClient;
    return this;
  }

  createHeaders() {
    this.headers = {};
    return this;
  }

  addHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers,
    };
    return this;
  }

  createInstance() {
    this.instance = axios.create({
      baseURL: this.apiUrl,
      timeout: this.timeout,
      headers: this.headers,
    });
    return this;
  }

  requestInterceptor() {
    const session = this.session;
    this.instance.interceptors.request.use(
      function (config) {
        if (config.data !== undefined) {
          if (process.env.CRYPTO_MODE === "on") {
            let data = config.data;
            if (typeof data === "object") {
              data = JSON.stringify(data);
            }
            config.data = {
              data: encrypt(
                data,
                session.aesKey,
                session.aesDel,
                session.rsaDel
              ),
            };
          }
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return this;
  }

  responseInterceptor() {
    const session = this.session;

    this.instance.interceptors.response.use(
      function (response) {
        if (response.data !== undefined && process.env.CRYPTO_MODE === "on") {
          response.data = decrypt(response.data, session.aesDel);
        }

        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return this;
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, data) {
    return this.instance.post(url, data);
  }
}

export default (session) => {
  async function get(url) {
    return await new httpClient(session).get(url);
  }

  async function post(url, data) {
    return await new httpClient(session).post(url, data);
  }

  return {
    get,
    post,
  };
};
