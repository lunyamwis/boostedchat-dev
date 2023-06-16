import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useAccountsApi } from "../../../../Apis/Instagram/Accounts.api";
import { CreateAccount } from "../../../../Interfaces/Instagram/account.interface";

export const useAccountsWrapperApi = () => {
  const { getAll, create } = useAccountsApi();
  const accountsQR = useQuery([queryKeys.instagram.accounts.getAccounts], () =>
    getAll()
  );

  const createAccount = useMutation((params: CreateAccount) => create(params));

  return {
    accountsQR,
    createAccount,
  };
};
