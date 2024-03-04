export const UrlHost = "/api/v1";

// Test url
export const GetStationInfo = "/extraction/Plcs/"; // stationTag

// Lines
export const GetLine = "/dt/Lines/"; // id
export const TracePiece = "/pieceTrace/Pieces/"; // serialNumber
export const PiecePagination = "/pieceTrace/Pieces/Pagination";
export const GetPlc = "/extraction/Plcs";

// Login
export const Login = "/auth/Authentication/login";
export const GetUsers = "/auth/Authentication";
export const GetSelfUser = "/auth/Authentication/SelfInformation";
export const RegisterUser = "/auth/Authentication/Register";
export const UpdateUser = "/auth/Authentication/Update";
export const ForgotPassword = "/auth/Authentication/ForgotPassword/";
export const ResetPassword = "/auth/Authentication/ResetPassword/"; // + password
