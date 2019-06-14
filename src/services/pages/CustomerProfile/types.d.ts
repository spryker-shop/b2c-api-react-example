import { ICustomerDataParsed, ICustomerProfileIdentity, ICustomerProfilePassword } from '@interfaces/customer';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface ICustomerRawResponse {
    data: ICustomerDataResponse;
}

interface ICustomerDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: ICustomerDataParsed;
}

interface IRequestBody {
    data: {
        type: string;
        id?: string;
        include?: string;
        attributes: ICustomerProfileIdentity | ICustomerProfilePassword;
    };
}
