import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";
import { getUser } from "../actions/user";

const useUser = () => {
  const { data, isLoading } = useQuery<User>({
    queryKey: ["user", "all"],
    queryFn: () => {
      return getUser();
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data,
    isLoading,
  };
};

export default useUser;
