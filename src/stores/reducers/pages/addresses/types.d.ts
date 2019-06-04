import { IActionData, IReduxState } from '@stores/reducers/types';
import { IAddressItem } from '@interfaces/addresses';

export interface IAddressesState extends IReduxState {
    data: {
        isMultipleAddressesLoading: boolean;
        addresses: IAddressItem[],
        currentAddress: IAddressItem,
    };
}

export interface IPageAddressesActionPayloadFulfilled {
    addressId: string;
    data: IAddressItem;
}

export interface IPageAddressesAction extends IActionData {
    addresses?: IAddressItem[];
    address?: IAddressItem;
    addressId?: string;
    payloadFulfilled?: IPageAddressesActionPayloadFulfilled;
}
