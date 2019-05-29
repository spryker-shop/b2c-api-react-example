import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';
import {
    ICustomerLoginData,
    ICustomerLoginDataParsed,
    ICustomerProfile,
    IResetPasswordPayload
} from '@interfaces/customer';

export interface ICustomerLoginRawResponse {
    data: ICustomerLoginDataResponse;
}

interface ICustomerLoginDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: ICustomerLoginDataParsed;
}

export interface IRequestBody {
    data: {
        type: string;
        include?: string;
        attributes: ICustomerProfile | ICustomerLoginData | IForgotPasswordBodyAttribute | IResetPasswordPayload;
    };
}

interface IForgotPasswordBodyAttribute {
    email: string;
}
