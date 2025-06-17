import { useExperimentsApi } from "@/Apis/Instagram/Experiments.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { useQuery } from "@tanstack/react-query";


export const useGetExperiments = () => {
  const { getExperiments } = useExperimentsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.experiments.getAll],
    queryFn: () => getExperiments(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetOneExperiment = (id: string) => {
  const { getOneExperiment } = useExperimentsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.experiments.getById],
    queryFn: () => getOneExperiment(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
