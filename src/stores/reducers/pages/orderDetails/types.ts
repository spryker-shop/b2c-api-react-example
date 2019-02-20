import { IActionData, IReduxState } from '@stores/reducers/types';
import { IOrderDetailsParsed } from '@interfaces/order';

export interface IOrderDetailsState extends IReduxState {
    data: IOrderDetailsParsed;
}

export interface IPageOrderDetailsAction extends IActionData {
    payloadFulfilled?: IOrderDetailsParsed;
}
