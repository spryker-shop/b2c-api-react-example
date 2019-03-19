import { IAddressItem } from '@interfaces/addresses';

export interface IAddressRawResponse {
    data: IAddressDataRawResponse[];
}

export interface IAddressDataRawResponse {
    attributes: IAddressItem;
    id: string;
    links: {
        self: string;
    };
    type: string;
}

export interface IAddressRawResponseOneValue {
    data: IAddressDataRawResponse;
}

export interface IRequestAddAddressBody {
    data: {
        type: string;
        attributes: IAddressItem;
        include?: string;
    };
}

export interface IRequestUpdateAddressBody {
    data: {
        type: string;
        id: string,
        attributes: IAddressItem;
        include?: string;
    };
}
