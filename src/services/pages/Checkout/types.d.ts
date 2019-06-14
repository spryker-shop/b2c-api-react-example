import { ICheckoutRequest, IPaymentProvider, IShipmentMethod } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface ICheckoutRawResponse {
    data: ICheckoutDataResponse;
}

interface ICheckoutDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        addresses: IAddressItemCollection[] | {};
        paymentProviders: IPaymentProvider[];
        shipmentMethods: IShipmentMethod[];
    };
}

interface IRequestBody {
    data: {
        type: string;
        include?: string;
        attributes: ICheckoutRequest;
    };
}
