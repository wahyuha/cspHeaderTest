import httpBase from './base';
export default class httpServer extends httpBase {
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
