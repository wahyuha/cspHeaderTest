import httpBase from './base';

export default class httpClient extends httpBase {
  createApiUrl() {
    this.apiUrl = 'http://localhost:5000/'
    return this
  }

  static addHeaders(headers) {
    const instance = new httpClient()
    instance.addHeaders(headers)
    return instance
  }

  static async get(url) {
    return await new httpClient().get(url)
  }

  static async post(url, data) {
    return await new httpClient().post(url, data)
  }
}
