import { fetcher } from "@/lib/http";
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from "./auth.types";
import { store } from "@/store";
import { accessTokenAtom } from "../auth.state";

export const logout = async () => {
  await fetcher("/auth/logout", {
    method: "POST",
    body: {},
  });
  window.location.href = "/login";
};

export const login = async (payload: LoginRequestDto) => {
  const response = await fetcher<LoginResponseDto>(
    "/auth/login",
    {
      method: "POST",
      body: payload,
    },
    { requiresAuthentication: false }
  );
  if (response.success) {
    // Set access token on success
    store.set(accessTokenAtom, response.data.accessToken);
  }
  return response;
};

export const signup = (payload: SignupRequestDto) => {
  return fetcher<SignupResponseDto>(
    "/user/signup",
    {
      method: "POST",
      body: payload,
    },
    { requiresAuthentication: false }
  );
};
