import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/user.service";

export const useUser = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
    refetchOnWindowFocus: false,
    throwOnError: true,
    retry: false,
  });

  return {
    data,
    isFetching,
  };
};
