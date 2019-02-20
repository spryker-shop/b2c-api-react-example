import { ApiResponse } from 'apisauce';

export type IApiResponseData = ApiResponse<any>;

export interface IApiErrorResponse {
    error?: string;
}
