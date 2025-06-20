import { useExperimentsApi } from "@/Apis/Instagram/Experiments.api";
import { useExperimentStatusApi } from "@/Apis/Instagram/ExperimentStatus.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { CreateExperiment, UpdateExperimentParams } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useQuery, useMutation } from "@tanstack/react-query";


export const useExperimentsWrapperApi = () => {
  const { create } = useExperimentsApi();
  const createExperiment = useMutation({
    mutationFn: (params: CreateExperiment) => create(params),
  });
  return {
    createExperiment,
  };
};

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
    queryKey: [queryKeys.instagram.experiments.getById, id],
    queryFn: () => getOneExperiment(id),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetExperimentStatuses = () => {
  const { getAllExperimentStatus } = useExperimentStatusApi();
  return useQuery({
    queryKey: [queryKeys.instagram.experimentStatus.getAll],
    queryFn: () => getAllExperimentStatus(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateExperimentDetails = () => {
  const { update } = useExperimentsApi();
  return useMutation({
    mutationFn: (params: UpdateExperimentParams) => update(params),
  });
};

export const useRemoveExperiment = () => {
  const { removeExperiment } = useExperimentsApi();
  return useMutation({
    mutationFn: (id: string) => removeExperiment(id)
  });

};