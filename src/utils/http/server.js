import axios from 'axios';

export default class httpServer {
  constructor() {
    this.apiUrl;
    this.headers;
    this.instance;
    this.timeout = 120000;

    this
      .createApiUrl()
      .createHeaders()
      .createInstance()
      .createInterceptor()
  }

  createApiUrl() {
    this.apiUrl = 'http://prahu-svc.linkaja.dev'
    return this
  }

  createHeaders() {
    this.headers = {
      'X-Request-ID': '01ERY9050186RN1VRTQZTA76BX'
    }
    return this
  }

  addHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers
    }
    return this
  }

  createInstance() {
    this.instance = axios.create({
      baseURL: this.apiUrl,
      timeout: this.timeout,
      headers: this.headers
    });
    return this
  }

  createInterceptor() {
    this.instance.interceptors.response.use(function (response) {
      // put interceptor here, could be log, etc
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    return this
  }

  get(url) {
    return this.instance.get(url)
  }

  post(url, data) {
    return this.instance.post(url, data)
  }

  static addHeaders(headers) {
    const instance = new httpServer()
    instance.addHeaders(headers)
    return instance
  }

  static async get(url) {
    return await new httpServer().get(url)
  }

  static async post(url, data) {
    return await new httpServer().post(url, data)
  }
}
