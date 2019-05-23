import { ICartDataParsed } from '@interfaces/cart';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface ICartData extends ICartDataParsed {
    cartCreated: boolean;
}

export interface ICartState extends IReduxState {
    data: ICartData;
}

export interface ICartAction extends IActionData {
    payloadCartItemFulfilled?: ICartDataParsed;
    payloadCartDeleteItemFulfilled?: {
        itemId: string;
    };
}
