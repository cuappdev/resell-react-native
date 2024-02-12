import { BASE_API_URL } from "@env";
import { returnAccessToken } from "../utils/asychStorageFunctions";

/**
 * The ApiClient is an abstraction of common networking actions that we perform
 * in Resell. Get an instance of the ApiClient using the `useApiClient` hook.
 * Use the get, put, post, and delete operations to perform network requests.
 * Authorization will automatically be in the headers, but make sure that you
 * have updated the accessToken before use if the user was not already signed in.
 */
export default class ApiClient {
  private accessToken: string | null;

  constructor() {
    this.loadAccessToken();
  }

  async loadAccessToken() {
    this.accessToken = await returnAccessToken();
  }

  private async request(
    type: string,
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return fetch(BASE_API_URL + route, {
      method: type,
      body: body ? JSON.stringify(body) : "",
      headers: {
        Authorization: this.accessToken ?? "",
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    }).then((response) => response.json());
  }

  async get(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("GET", route, body, headers, options);
  }

  async put(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("PUT", route, body, headers, options);
  }

  async delete(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("DELETE", route, body, headers, options);
  }

  async post(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("POST", route, body, headers, options);
  }
}
