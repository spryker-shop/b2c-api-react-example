import { IInitData } from '@interfaces/init';
import { ICategory } from '@interfaces/category';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { TAppLocale } from '@interfaces/locale';

export interface IInitState extends IReduxState {
    data: IInitData | null;
}

export interface IInitAction extends IActionData {
    payloadInitFulfilled?: IInitData;
    payloadCategoriesTreeFulfilled?: {categories: ICategory[]};
    payloadLocaleFulfilled?: ILocaleActionPayload;
    payloadIsLockedPage?: boolean;
}

export interface ILocaleActionPayload {
    locale: TAppLocale;
}
