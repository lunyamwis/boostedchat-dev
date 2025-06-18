import { useExperimentFieldDefinitionApi } from "@/Apis/Instagram/ExperimentFieldDefinition.api";
import { useExperimentsApi } from "@/Apis/Instagram/Experiments.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { CreateExperimentFieldDefinition, UpdateExperimentParams } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useQuery, useMutation } from "@tanstack/react-query";


export const useGetExperimenFieldDefinitionsWrapperApi = () => {
  const { create } = useExperimentFieldDefinitionApi();
  const createExperimentFieldDefinition = useMutation({
    mutationFn: (params: CreateExperimentFieldDefinition) => create(params),
  });
  return {
    createExperimentFieldDefinition,
  };
};

export const useGetExperimenFieldDefinitions = () => {
  const { getFieldDefinitions } = useExperimentFieldDefinitionApi();
  return useQuery({
    queryKey: [queryKeys.instagram.experiments.getAll],
    queryFn: () => getFieldDefinitions(),
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



export const useUpdateExperimentDetails = () => {
  const { update } = useExperimentsApi();
  return useMutation({
    mutationFn: (params: UpdateExperimentParams) => update(params),
  });
};