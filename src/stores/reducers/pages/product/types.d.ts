import { IActionData, IReduxState } from '@stores/reducers/types';
import { IProductDataParsed } from '@interfaces/product';

export interface IProductState extends IReduxState {
    data: {
        selectedProduct: IProductDataParsed | null,
    };
}

export interface IPageProductAction extends IActionData {
    payloadFulfilled?: IProductDataParsed;
}
