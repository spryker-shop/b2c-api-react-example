import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { IBillingSelectionState } from '@interfaces/checkout';
import { IAddressItem } from '@interfaces/addresses';
import { IAddressFormState, IConfigInputState } from '@interfaces/forms';

export interface ICheckoutRegisterFormProps extends RouteProps, Partial<RouteComponentProps> {
    isUserLoggedIn?: boolean;
    customerRegisterAction?: Function;
    getCustomerCartsAction?: Function;
    isLoading?: boolean;
    isCartLoading?: boolean;
    deliveryNewAddress?: IAddressFormState;
    billingNewAddress?: IAddressFormState;
    isMultipleAddressesLoading?: boolean;
    billingSelection?: IBillingSelectionState;
    addMultipleAddressAction?: (payload: IAddressItem, customerId: string, billing: IAddressItem) => void;
    customer?: string;
}

export interface ICheckoutRegisterFormState {
    fields: {
        [index: string]: IConfigInputState;
        password: IConfigInputState;
        confirmPassword: IConfigInputState;
    };
    isFormValid: boolean;
    isCartLoading: boolean;
}

export interface IAddressPayload {
    address: IAddressFormState;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
}
