import authService from "../../helpers/authorizeService";
import {
  type ApiResponse,
  RequestType,
  ResponseStatus,
  asyncResponse,
  authorizationError,
  communicationError,
} from "./serviceConstants";

interface IRequestOptions {
  headers: any;
  method: RequestType;
  body?: any;
}

export const RequestOptions = (
  type: RequestType,
  token: string | null,
  data = {}
): IRequestOptions => {
  let header = {};
  if (type === RequestType.POST)
    header = {
      "Content-Type": "application/problem+json; charset=utf-8",
    };
  if (token)
    header = {
      ...header,
      Authorization: `Bearer ${token}`,
    };
  switch (type) {
    case RequestType.GET:
      return {
        method: RequestType.GET,
        headers: header,
      };
    case RequestType.POST:
      return {
        method: RequestType.POST,
        headers: header,
        body: JSON.stringify(data),
      };
    case RequestType.DELETE:
      return {
        method: RequestType.DELETE,
        headers: header,
      };
    case RequestType.FORM:
      return {
        method: RequestType.POST,
        headers: header,
        body: data,
      };
    case RequestType.PUT:
      return {
        method: RequestType.PUT,
        headers: header,
        body: JSON.stringify(data),
      };
    default:
      return {
        method: RequestType.GET,
        headers: header,
      };
  }
};

export const fetchMethod = async (
  url: string,
  type = RequestType.GET,
  data: any = {},
  authenticated = true
): Promise<ApiResponse> => {
  let token = null;
  if (authenticated) token = await authService.getAccessToken();
  const request = RequestOptions(type, token, data);
  try {
    const response = await fetch(url, request as RequestInit);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!response.ok) throw response;
    return asyncResponse(
      ResponseStatus.OK,
      await response.json().catch(() => {})
    );
  } catch (err: any) {
    if (err.status === ResponseStatus.BAD_REQUEST) {
      const errorMessage = Promise.resolve(
        err.text().then((errorMessage: any) => {
          return errorMessage;
        })
      );
      return asyncResponse(ResponseStatus.BAD_REQUEST, {}, await errorMessage);
    } else if (err.status === ResponseStatus.NO_AUTH) {
      return asyncResponse(ResponseStatus.NO_AUTH, {}, authorizationError);
    } else if (err.status === ResponseStatus.CONFLICT) {
      const errorMessage = Promise.resolve(
        err.text().then((errorMessage: any) => {
          return errorMessage;
        })
      );
      return asyncResponse(ResponseStatus.BAD_REQUEST, {}, await errorMessage);
    } else {
      return asyncResponse(ResponseStatus.BAD_GATEWAY, {}, communicationError);
    }
  }
};
