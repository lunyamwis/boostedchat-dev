import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useLeadsApi } from "../../../Apis/Leads/Leads.api";
import { CreateLead } from "../../../Interfaces/Leads/lead.interface";

export const useGetLeads = () => {
  const { getAll } = useLeadsApi();
  return useQuery([queryKeys.leads.getAll], () => getAll());
};

export const useCreateLead = () => {
  const { create } = useLeadsApi();
  return useMutation((params: CreateLead) => create(params));
};
