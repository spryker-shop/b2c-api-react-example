import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';
import { ICustomerLoginDataParsed } from '@interfaces/customer';

export interface ICustomerLoginRawResponse {
    data: ICustomerLoginDataResponse;
}

interface ICustomerLoginDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: ICustomerLoginDataParsed;
}
