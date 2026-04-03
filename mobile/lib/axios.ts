import axios from "axios";
import * as Sentry from "@sentry/react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

const API_URL = "https://memo-chat.onrender.com/api";
const MAX_TOKEN_ATTEMPTS = 8;
const TOKEN_RETRY_DELAY_MS = 500;

export class AuthTokenUnavailableError extends Error {
  constructor(message = "No auth token available") {
    super(message);
    this.name = "AuthTokenUnavailableError";
  }
}

export const waitForAuthToken = async (getToken: () => Promise<string | null>) => {
  for (let attempt = 1; attempt <= MAX_TOKEN_ATTEMPTS; attempt += 1) {
    const token = await getToken();
    if (token) return token;

    if (attempt < MAX_TOKEN_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, TOKEN_RETRY_DELAY_MS * attempt));
    }
  }

  throw new AuthTokenUnavailableError();
};


// this is the same thing we did with useEffect setup but it's optimized version - it's better!!

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor registered once
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      Sentry.logger.error(
        Sentry.logger
          .fmt`API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        { status: error.response.status, endpoint: error.config?.url, method: error.config?.method }
      );
    } else if (error.request) {
      Sentry.logger.warn("API request failed - no response", {
        endpoint: error.config?.url,
        method: error.config?.method,
      });
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const isAuthReady = isLoaded && isSignedIn;

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
       const token = await waitForAuthToken(getToken);
      return api.request<T>({
        ...config,
       headers: { ...config.headers, Authorization: `Bearer ${token}` },
      });
    },
    [getToken]
  );

 return { api, apiWithAuth, isAuthReady };
};