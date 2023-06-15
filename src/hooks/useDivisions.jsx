import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDivisions = () => {
  // const token = localStorage.getItem('access-token');
  const {
    refetch: refetchDivisionsData,
    data: divisions = [],
    isLoading: isDivisionsLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `http://59.152.62.177:8085/api/Employee/Division`
      );
      return res.data;
    },
  });

  return [divisions, refetchDivisionsData, isDivisionsLoading];
};

export default useDivisions;
