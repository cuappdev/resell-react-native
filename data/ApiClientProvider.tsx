import React, { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "./ApiClient";

// Step 1: Create a new context
const ApiClientContext = createContext<ApiClient>(null);

/**
 * Context that provides the API client throughout the app.
 */
export default function ApiClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [apiClient, setApiClient] = useState<ApiClient | null>(null);

  useEffect(() => {
    const client = new ApiClient();
    setApiClient(client);
  }, []);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
}

/**
 * Custom hook to retrieve an instance of the API client class to be used
 * throughout the app.
 * @returns an instance of the `ApiClient` class from the context.
 */
export const useApiClient = (): ApiClient | null => {
  return useContext(ApiClientContext);
};
