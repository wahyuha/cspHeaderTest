import axios from "axios";
import { apiUrlServer, apiUrlServerLoko } from "@constants/url";
import { logStartOutbond, logEndOutbond } from "@constants/logger";

class httpServer {
  constructor(session) {
    this.apiUrl = apiUrlServer;
    this.headers = {};
    this.instance;
    this.session = session;
    this.timeout = 120000;
    this.createHeaders()
      .createInstance()
      .requestInterceptor()
      .responseInterceptor();
  }

  setUrl(apiUrl) {
    this.apiUrl = apiUrl;
    this.createInstance();
    return this;
  }

  createHeaders() {
    const requestId = this.session.requestId;
    if (requestId) {
      this.headers = {
        "X-Request-ID": requestId,
      };
    }
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
    const remHead = ["common", "get", "post", "head", "put", "patch", "delete"];
    this.instance.interceptors.request.use(
      function (config) {
        const headers = config.headers;
        remHead.forEach((header) => delete headers[header]);

        const mts = {
          headers: headers,
          query: config.query || {},
          params: config.params || {},
          body: config.data,
        };
        const path = {
          domain: config.baseURL,
          pathname: config.url,
        };

        console.start(
          session.requestId,
          session.tid,
          logStartOutbond,
          path,
          mts
        );
        return config;
      },
      function (error) {
        const config = error.config;
        const headers = config.headers;
        const path = {
          domain: config.baseURL,
          pathname: config.url,
        };
        const remHead = [
          "common",
          "get",
          "post",
          "head",
          "put",
          "patch",
          "delete",
        ];
        remHead.forEach((header) => delete headers[header]);
        const mts = { error: true, headers: headers, errors: error };
        console.start(
          session.requestId,
          session.tid,
          logStartOutbond,
          path,
          mts
        );

        return Promise.reject(error);
      }
    );
    return this;
  }

  responseInterceptor() {
    const session = this.session;
    this.instance.interceptors.response.use(
      function (response) {
        const config = response.config;
        const path = {
          domain: config.baseURL,
          pathname: config.url,
        };

        let mte = {
          code: response.status,
          message: response.statusText,
          data: response.data,
        };
        if (
          typeof response.data === "string" &&
          response.data.substring(2, 14).toLowerCase() === "doctype html"
        ) {
          mte = {
            error: true,
            code: response.statusCode,
            message: response.statusMessage,
            data: "html file",
          };
        }
        console.end(session.requestId, session.tid, logEndOutbond, path, mte);

        return response;
      },
      function (error) {
        const config = error.config;
        const path = {
          domain: config.baseURL,
          pathname: config.url,
        };
        const response = error.response;
        let code = "";
        let message = "";
        if (response !== undefined) {
          code = response.status;
          message = response.statusText;
        }
        const mte = {
          error: true,
          code: code,
          message: message,
          rawMessage: error.Error,
        };
        console.end(session.requestId, session.tid, logEndOutbond, path, mte);

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
    return await new httpServer(session).get(url);
  }

  async function post(url, data) {
    return await new httpServer(session).post(url, data);
  }

  async function postLoko(url, data) {
    return await new httpServer(session)
      .setUrl(apiUrlServerLoko)
      .post(url, data);
  }

  return {
    get,
    post,
    postLoko,
  };
};
