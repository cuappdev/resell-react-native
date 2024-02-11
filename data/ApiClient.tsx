const BASE_API_URL = "https://resell-dev.cornellappdev.com/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ApiClient {
  private accessToken: string | null;

  constructor() {
    this.loadAccessToken();
  }

  async loadAccessToken() {
    this.accessToken = await AsyncStorage.getItem("accessToken");
  }

  private async request(
    type: string,
    route: string,
    body: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return fetch(BASE_API_URL + route, {
      method: type,
      body: JSON.stringify(body),
      headers: {
        Authorization: this.accessToken ?? "",
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    });
  }

  async get(
    route: string,
    body: Record<string, any>,
    headers: Record<string, string>,
    options?: any,
    accessToken?: string
  ) {
    return this.request("GET", route, body, headers, options);
  }

  async put(
    route: string,
    body: Record<string, any>,
    headers: Record<string, string>,
    options?: any,
    accessToken?: string
  ) {
    return this.request("PUT", route, body, headers, options);
  }

  async delete(
    route: string,
    body: Record<string, any>,
    headers: Record<string, string>,
    options?: any,
    accessToken?: string
  ) {
    return this.request("DELETE", route, body, headers, options);
  }

  async post(
    route: string,
    body: Record<string, any>,
    headers: Record<string, string>,
    options?: any,
    accessToken?: string
  ) {
    return this.request("POST", route, body, headers, options);
  }
}
