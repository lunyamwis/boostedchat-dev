import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { axiosError, httpErrorTypes } from "../Interfaces/general.interface";

export function useCustomQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn" | "initialData"
  >
): UseQueryResult<TData, TError> {
  return useQuery(queryKey, queryFn, {
    ...options,
    onError: (err) => {
      const customErr = err as axiosError;
      if (customErr.statusCode === 401) {
        // dispatch({ type: "LOGOUT" });
        return;
      }
      if (options?.onError) {
        let errMessage = "";
        if (
          customErr.errorType === httpErrorTypes.network ||
          customErr.errorType === httpErrorTypes.unknown
        ) {
          errMessage = customErr.data;
        } else if (customErr.data.message) {
          if (typeof customErr.data.message === "string") {
            errMessage = customErr.data.message;
          } else errMessage = customErr.data.message.toString();
        } else {
          errMessage = "An error occurred. Please try again.";
        }
        options.onError(errMessage as TError);
      }
    },
  });
}
