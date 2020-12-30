import httpBase from './base';
import { apiUrlClient } from '@constants/url';

export default class httpClient extends httpBase {
  createApiUrl() {
    this.apiUrl = apiUrlClient
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
