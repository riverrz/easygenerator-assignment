import { fetcher } from "@/lib/http";
import { User } from "./user.types";

export const getUserProfile = async () => {
  const response = await fetcher<User>("/user/profile", {
    method: "GET",
  });
  if (response.success) {
    return response.data;
  }
  throw response.error;
};
