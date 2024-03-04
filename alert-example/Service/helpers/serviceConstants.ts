export interface ApiResponse {
  status: ResponseStatus;
  error: string;
  data?: any;
}

export const asyncResponse = (
  status: ResponseStatus,
  data: any,
  error = ""
): ApiResponse => ({
  status,
  data,
  error,
});

// METHODS
export enum RequestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  FORM = "FORM",
  PATCH = "PATCH",
}

// STATUS
export enum ResponseStatus {
  OK = 200,
  BAD_REQUEST = 400,
  NO_AUTH = 401,
  CONFLICT = 409,
  BAD_GATEWAY = 500,
  NO_CONNECTION = 600,
}

// ERROR FOR API
export const communicationError =
  "No se logró comunicación con los servidores, porfavor intentalo más tarde";
export const connectionError =
  "No tienes conexión a internet, porfavor intentalo más tarde.";
export const authorizationError =
  "No tienes autorización para realizar esta acción.";
