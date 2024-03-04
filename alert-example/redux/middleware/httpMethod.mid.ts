import {
  type ApiResponse,
  ResponseStatus,
} from "../../Service/helpers/serviceConstants";
import { apiRequest, apiSuccess, apiFail } from "../ducks/apiData";
import { type AppDispatch } from "../createStore";

export interface ApiMethodType {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  (...params: any[]): Promise<ApiResponse>;
}

export const GetApi = (params: any[] = [], apiMethod: ApiMethodType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(apiRequest());
    const result = await apiMethod(...params);
    if (result.status === ResponseStatus.OK) {
      return dispatch(apiSuccess(result.data));
    } else {
      return dispatch(apiFail({ error: result.error, status: result.status }));
    }
  };
};

export const PostApi =
  (params: any[] = [], apiMethod: ApiMethodType) =>
  async (dispatch: AppDispatch) => {
    dispatch(apiRequest());
    const result = await apiMethod(...params);
    if (result.status === ResponseStatus.OK) {
      return dispatch(apiSuccess({ postConfirmation: true }));
    } else {
      return dispatch(
        apiFail({
          error: result.error,
          status: result.status,
          data: { postConfirmation: true },
        })
      );
    }
  };

export const PostApiConfirmation = () => async (dispatch: AppDispatch) => {
  return dispatch(apiSuccess({}));
};
