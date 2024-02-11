import React, { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "./ApiClient";

// Step 1: Create a new context
const ApiClientContext = createContext<ApiClient>(null);

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

// Step 3: Create a custom hook to use this context
export const useApiClient = (): ApiClient | null => {
  return useContext(ApiClientContext);
};
