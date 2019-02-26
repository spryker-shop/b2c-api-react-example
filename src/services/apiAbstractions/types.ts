export type TErrorCode = string;
export type TErrorDetail = string;
export type TErrorStatus = number;

export interface IErrorItem {
    code: TErrorCode;
    detail: TErrorDetail;
    status: TErrorStatus;
}

export interface IResponseError {
    problem?: string;
    data?: {
        errors: IErrorItem[],
    };
}
