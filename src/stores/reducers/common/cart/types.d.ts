import { ICartDataParsed } from '@interfaces/cart';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface ICartData extends ICartDataParsed {
    isCartCreated: boolean;
}

export interface ICartState extends IReduxState {
    data: ICartData;
}

export interface ICartCreatePayload {
    priceMode: string;
    currency: string;
    store: string;
}

export interface ICartAction extends IActionData {
    payloadCartItemFulfilled?: ICartDataParsed;
    payloadCartDeleteItemFulfilled?: {
        sku: string;
    };
}
