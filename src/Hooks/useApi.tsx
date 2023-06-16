import { axiosError, httpErrorTypes } from "../Interfaces/general.interface";

export function useApi() {
  const handleApiError = (err: axiosError): string => {
    let errMessage = "";
    if (
      err.errorType === httpErrorTypes.network ||
      err.errorType === httpErrorTypes.unknown
    ) {
      errMessage = err.data;
    } else if (err.data.message) {
      if (typeof err.data.message === "string") {
        errMessage = err.data.message;
      } else errMessage = err.data.message.toString();
    } else {
      errMessage = "An error occurred. Please try again.";
    }
    return errMessage;
  };

  return { handleApiError };
}
