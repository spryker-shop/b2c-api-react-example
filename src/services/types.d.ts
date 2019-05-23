import { ApiResponse } from 'apisauce';

export type TApiResponseData = ApiResponse<any>;

export interface IApiErrorResponse {
    error?: string;
}

export interface IErrorItem {
    code: string;
    detail: string;
    status: number;
}

export interface IResponseError {
    problem?: string;
    data?: {
        errors: IErrorItem[],
    };
}

export interface IAbstractRowIncludedResponse {
    type: string;
    links: {
        self: string;
    };
    id?: string;
}

export interface IRelationshipsResponse {
    relationships: {
        [key: string]: {
            data: [{
                type: string;
                id: string;
            }]
        };
    };
}
