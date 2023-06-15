import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchUser = (id) => {
  // const token = localStorage.getItem('access-token');
  const {
    refetch: refetchUserData,
    data: user,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`
      );
      return res.data;
    },
  });

  return [user, refetchUserData, isUserLoading];
};

export default useFetchUser;
