import { AxiosError, AxiosResponse } from "axios";
import { httpErrorTypes } from "../Interfaces/general.interface";

export const handleRestResponse = (response: AxiosResponse) => {
  if (response.data) {
    return response.data;
  }

  return response;
};

export const handleRestError = (error: AxiosError) => {
  throw JSONAPIError.fromAxiosError(error);
};

class JSONAPIError extends Error {
  public statusCode: number;

  public statusMessage: string;

  public errorType: httpErrorTypes | undefined;

  public data: unknown;

  constructor(
    message: string,
    code: number,
    type: httpErrorTypes | undefined,
    data: unknown
  ) {
    super(message);
    this.statusCode = code;
    this.statusMessage = message;
    this.errorType = type;
    this.data = data;
    Object.setPrototypeOf(this, MyError.prototype);
  }

  public static fromAxiosError(error: AxiosError) {
    if (error.response) {
      let errType: httpErrorTypes;
      const code = error.response.status;
      if (code >= 100 && code < 200) {
        errType = httpErrorTypes.information;
      } else if (code >= 200 && code < 300) {
        errType = httpErrorTypes.success;
      } else if (code >= 300 && code < 400) {
        errType = httpErrorTypes.redirection;
      } else if (code >= 400 && code < 500) {
        errType = httpErrorTypes.client;
      } else if (code >= 500 && code < 600) {
        errType = httpErrorTypes.server;
      } else errType = httpErrorTypes.unknown;

      let errMessage = "";
      type ServerErrorMessage = {
        data: null;
        errors: Record<string, string>[];
        message: string;
        meta: { length: number; took: number; total: number };
      };
      const serverErrorObject = error.response.data as ServerErrorMessage;
      if (
        errType === (httpErrorTypes.network as httpErrorTypes) ||
        errType === httpErrorTypes.unknown
      ) {
        errMessage =
          "You seem to be offline. Please check that you are connected to the internet and try again";
      } else if (serverErrorObject.message) {
        errMessage = serverErrorObject.message;
      } else {
        errMessage = "An error occurred. Please try again.";
      }

      return new JSONAPIError(
        error.message,
        error.response.status,
        errType,
        errMessage
      );
    }
    if (error.request) {
      return new JSONAPIError(
        error.message,
        0,
        httpErrorTypes.network,
        "Your are offline. Please check your network connection and try again."
      );
    }
    return new JSONAPIError(
      "Error",
      0,
      httpErrorTypes.unknown,
      "An error occurred. Please try again."
    );
  }
}

class MyError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MyError.prototype);
  }
}
