import { IProductRelationsItem } from '@interfaces/product';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface IProductRelationsState extends IReduxState {
    data: {
        products: IProductRelationsItem[]
    };
}

export interface IProductRelationsAction extends IActionData {
    payloadFulfilled?: IProductRelationsItem[];
}
