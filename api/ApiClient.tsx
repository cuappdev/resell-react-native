import AsyncStorage from "@react-native-async-storage/async-storage";
import { returnAccessToken } from "../utils/asychStorageFunctions";

/**
 * The ApiClient is an abstraction of common networking actions that we perform
 * in Resell. Get an instance of the ApiClient using the `useApiClient` hook.
 * Use the get, put, post, and delete operations to perform network requests.
 * Authorization will automatically be in the headers, but make sure that you
 * have updated the accessToken before use if the user was not already signed in.
 * If you need sign out the user, be sure to reset the access token with the
 * `loadAccessToken` method
 */
export default class ApiClient {
  private accessToken: string | null;

  constructor() {
    this.loadAccessToken();
  }
  /**
   * Sets the accessToken that the API client uses for authorization in network
   * requests to the string stored in the `accessToken` key by React Native
   * Async Storage
   */
  async loadAccessToken() {
    try {
      this.accessToken = await returnAccessToken();
    } catch (_) {
      this.accessToken = null;
    }
  }

  /**
   * Removes the access token from React Native Async Storage
   * as well as from the api client.
   */
  async clearAccessToken() {
    await AsyncStorage.removeItem("accessToken");
    this.accessToken = null;
  }

  private async request(
    type: string,
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return fetch(process.env.BASE_API_URL + route, {
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

  /**
   * Performs a GET request at the relative URL, with the response already
   * parsed to JSON.
   * @param route the relative URL, any part of the URL that comes after `/api`
   * @param body JSON body for the request
   * @param headers JSON headers for the request
   * @param options any additional request options, should use JSON
   * @returns
   */
  async get(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("GET", route, body, headers, options);
  }

  /**
   * Performs a PUT request at the relative URL, with the response already
   * parsed to JSON.
   * @param route the relative URL, any part of the URL that comes after `/api`
   * @param body JSON body for the request
   * @param headers JSON headers for the request
   * @param options any additional request options, should use JSON
   * @returns
   */
  async put(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("PUT", route, body, headers, options);
  }

  /**
   * Performs a DELETE request at the relative URL, with the response already
   * parsed to JSON.
   * @param route the relative URL, any part of the URL that comes after `/api`
   * @param body JSON body for the request
   * @param headers JSON headers for the request
   * @param options any additional request options, should use JSON
   * @returns
   */
  async delete(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("DELETE", route, body, headers, options);
  }
  /**
   * Performs a POST request at the relative URL, with the response already
   * parsed to JSON.
   * @param route the relative URL, any part of the URL that comes after `/api`
   * @param body JSON body for the request
   * @param headers JSON headers for the request
   * @param options any additional request options, should use JSON
   * @returns
   */
  async post(
    route: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    options?: any
  ) {
    return this.request("POST", route, body, headers, options);
  }

  hasAccessToken(): boolean {
    return this.accessToken ? true : false;
  }
}
