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
  addressId: IAddressItem['id'];
  data: IAddressItem;
}

export interface IPageAddressesAction extends IActionData {
  addresses?: IAddressItem[];
  address?: IAddressItem;
  addressId?: IAddressItem['id'];
  payloadFulfilled?: IPageAddressesActionPayloadFulfilled;
}
