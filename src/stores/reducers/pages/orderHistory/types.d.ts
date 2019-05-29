import { IOrderCollectionParsed } from '@interfaces/order';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface IOrdersData extends IOrderCollectionParsed {}

export interface IOrderHistoryState extends IReduxState {
    data: IOrdersData;
}

export interface IPageOrderHistoryAction extends IActionData {
    payloadFulfilled?: IOrderCollectionParsed;
}
