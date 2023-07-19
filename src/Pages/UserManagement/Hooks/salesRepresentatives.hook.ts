import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useSalesRepApi } from "../../../Apis/UserManagement/SalesRep.api";
import { CreateSalesRep } from "../../../Interfaces/UserManagement/salesRep.interface";

export const useGetSalesReps = () => {
  const { getAll } = useSalesRepApi();
  return useQuery([queryKeys.salesReps.getAll], () => getAll());
};

export const useCreateSalesRep = () => {
  const { create } = useSalesRepApi();
  return useMutation((params: CreateSalesRep) => create(params));
};

export const useAssignSalseRep = () => {
  const { assignSalesRep } = useSalesRepApi();
  return useMutation(() => assignSalesRep());
};
