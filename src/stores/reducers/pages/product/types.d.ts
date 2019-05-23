import { IActionData, IReduxState } from '@stores/reducers/types';
import { IProductDataParsed } from '@helpers/parsing/product/types';

export interface IProductState extends IReduxState {
    data: {
        selectedProduct: IProductDataParsed | null,
    };
}

export interface IPageProductAction extends IActionData {
    payloadFulfilled?: IProductDataParsed;
}
