import { IInitData } from '@interfaces/init';
import { ICategory } from '@interfaces/category';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface IInitState extends IReduxState {
    data: IInitData | null;
}

export interface IInitAction extends IActionData {
    payloadInitFulfilled?: IInitData;
    payloadCategoriesTreeFulfilled?: {categories: ICategory[]};
    payloadLocaleFulfilled?: ILocaleActionPayload;
    payloadisPageLocked?: boolean;
    payloadAnonymIdFulfilled?: string;
}

export interface ILocaleActionPayload {
    locale: string | null;
}
