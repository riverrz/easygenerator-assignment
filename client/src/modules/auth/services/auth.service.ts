import { fetcher } from "@/lib/http";
import { LoginDto, SignupDto } from "./auth.types";

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

export const signup = async (payload: SignupDto) => {
  const response = await fetcher("/signup", {
    method: "POST",
    body: payload,
  });
  if (response.success) {
    return response.data;
  } else {
    return response.error;
  }
};
