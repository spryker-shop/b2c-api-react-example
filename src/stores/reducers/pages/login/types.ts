import {
    ICustomerLoginDataParsed,
    ILoginDataToLocalStorage,
    IResetPasswordPayload,
} from '@interfaces/customer';
import { IActionData, IReduxState } from '@stores/reducers/types';

interface ILoginStateData extends ICustomerLoginDataParsed {
    isAuth?: boolean;
    customerUsername: string;
}

export interface ILoginState extends IReduxState {
    data: ILoginStateData;
}

export interface IPageLoginAction extends IActionData {
    payloadStoreFulfilled?: ILoginDataToLocalStorage;
    payloadProfileDataFulfilled?: ICustomerLoginDataParsed;
    payloadAuthFulfilled?: ICustomerLoginDataParsed;
    payloadResetPassword?: IResetPasswordPayload;
    payload?: ICustomerLoginDataParsed;
}
