import axios from 'axios';

export default class httpBase {
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
    return this
  }

  createHeaders() {
    this.headers = {}
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
}
