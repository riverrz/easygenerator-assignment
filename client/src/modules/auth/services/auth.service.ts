import { fetcher } from "@/lib/http";
import { LoginDto, SignupRequestDto, SignupResponseDto } from "./auth.types";

export const logout = () => {
  window.location.href = "/login";
};

export const login = async (payload: LoginDto) => {
  const response = await fetcher("/login", {
    method: "POST",
    body: payload,
  });
  if (response.success) {
    return response.data;
  } else {
    return response.error;
  }
};

export const signup = (payload: SignupRequestDto) => {
  return fetcher<SignupResponseDto>("/signup", {
    method: "POST",
    body: payload,
  });
};
