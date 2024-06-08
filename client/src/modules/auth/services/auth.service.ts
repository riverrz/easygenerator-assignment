import { fetcher } from "@/lib/http";
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from "./auth.types";

export const logout = () => {
  window.location.href = "/login";
};

export const login = (payload: LoginRequestDto) => {
  return fetcher<LoginResponseDto>("/login", {
    method: "POST",
    body: payload,
  });
};

export const signup = (payload: SignupRequestDto) => {
  return fetcher<SignupResponseDto>("/signup", {
    method: "POST",
    body: payload,
  });
};
