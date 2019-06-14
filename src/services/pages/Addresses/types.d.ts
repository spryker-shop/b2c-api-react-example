import { IAddressItem } from '@interfaces/addresses';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

interface IAddressDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IAddressItem;
}

export interface IRequestUpdateAddressBody {
    data: {
        type: string;
        id?: string,
        attributes: IAddressItem;
        include?: string;
    };
}
