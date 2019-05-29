import { IActionData, IReduxState } from '@stores/reducers/types';
import { IAddressItem } from '@interfaces/addresses';

export interface IAddressesState extends IReduxState {
    data: {
        isMultipleAddressesLoading: boolean;
        addresses: IAddressItem[],
        currentAddress: IAddressItem | null,
    };
}

export interface IPageAddressesActionPayloadFulfilled {
    addressId: string | null;
    data: IAddressItem;
}

export interface IPageAddressesAction extends IActionData {
    addresses?: IAddressItem[];
    address?: IAddressItem;
    addressId?: string | null;
    payloadFulfilled?: IPageAddressesActionPayloadFulfilled;
}
