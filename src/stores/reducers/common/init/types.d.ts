import { IInitData } from '@interfaces/init';
import { ICategory } from '@interfaces/common';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { ICustomerLoginDataParsed } from '@interfaces/customer';

export interface IInitState extends IReduxState {
    data: IInitData | null;
}

export interface IInitAction extends IActionData {
    payloadInitFulfilled?: IInitData;
    payloadCategoriesTreeFulfilled?: {categories: ICategory[]};
    payloadLocaleFulfilled?: ILocaleActionPayload;
    payloadisPageLocked?: boolean;
    payloadAnonymIdFulfilled?: string;
    payloadAuthFulfilled?: ICustomerLoginDataParsed;
}

export interface ILocaleActionPayload {
    locale: string | null;
}
