import { envs } from "@/config";
import { logout } from "@/modules/auth/services/auth.service";

type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

type FetcherReturnType<TData> =
  | { success: true; data: TData }
  | { success: false; error: ErrorResponse };

interface FetcherRequestInit extends Omit<RequestInit, "body"> {
  body: unknown;
}

export const fetcher = async <TData>(
  url: string | URL | Request,
  init: FetcherRequestInit
): Promise<FetcherReturnType<TData>> => {
  const requestInit: RequestInit = {
    ...init,
    body: init.body ? JSON.stringify(init.body) : undefined,
  };

  const response = await fetch(`${envs.apiUrl}${url}`, requestInit);

  const data = await response.json();

  if (response.ok) {
    return {
      success: true,
      data: data as TData,
    };
  }

  if (response.status === 401) {
    // Unauthenticated, so logout
    await logout();
  }

  return {
    success: false,
    error: data as ErrorResponse,
  };
};
