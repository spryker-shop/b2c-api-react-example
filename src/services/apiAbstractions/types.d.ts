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
