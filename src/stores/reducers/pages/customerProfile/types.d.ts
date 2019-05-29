import { ICustomerDataParsed } from '@interfaces/customer';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface ICustomerState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null,
    isPasswordUpdated: boolean | null;
  };
}

export interface IPageCustomerProfileAction extends IActionData {
  payloadProfileFulfilled?: ICustomerDataParsed;
}
