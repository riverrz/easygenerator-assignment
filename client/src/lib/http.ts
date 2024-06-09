import { envs } from "@/config";
import { accessTokenAtom } from "@/modules/auth/auth.state";
import { logout } from "@/modules/auth/services/auth.service";
import { store } from "@/store";

type ErrorResponse = {
  message: string;
  error?: string;
  statusCode: number;
};

type SuccessResponse<TData> = {
  data: TData;
  sync_token?: string;
};

type FetcherReturnType<TData> =
  | { success: true; data: TData }
  | { success: false; error: ErrorResponse };

interface FetcherRequestInit extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export const fetcher = async <TData>(
  url: string | URL | Request,
  init: FetcherRequestInit,
  opts: { requiresAuthentication?: boolean } = { requiresAuthentication: true }
): Promise<FetcherReturnType<TData>> => {
  const { requiresAuthentication } = opts;

  const requestInit: RequestInit = {
    ...init,
    body: init.body ? JSON.stringify(init.body) : undefined,
    credentials: "include",
  };

  if (init.body) {
    requestInit.headers = {
      ...requestInit.headers,
      "Content-Type": "application/json",
    };
  }

  const accessToken = store.get(accessTokenAtom);

  // Attach the access token if authentication is required
  if (requiresAuthentication && accessToken) {
    requestInit.headers = {
      ...requestInit.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  const response = await fetch(`${envs.apiUrl}${url}`, requestInit);

  const responsePayload = await response.json();

  if (response.ok) {
    const { data, sync_token: syncToken } =
      responsePayload as SuccessResponse<TData>;

    if (syncToken) {
      // Replace the access token with sync token
      store.set(accessTokenAtom, syncToken);
    }

    return {
      success: true,
      data,
    };
  }

  if (response.status === 401) {
    // Unauthenticated, so logout
    await logout();
  }
  const errorResponseData = responsePayload.data.error as ErrorResponse;
  const errorMessage = Array.isArray(errorResponseData.message)
    ? errorResponseData.message.join(",")
    : errorResponseData.message;
  errorResponseData.message = errorMessage;
  return {
    success: false,
    error: errorResponseData,
  };
};
