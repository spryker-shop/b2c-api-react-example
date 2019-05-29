import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { IBillingSelectionState } from '@interfaces/checkout';
import { IAddressItem } from '@interfaces/addresses';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutRegisterFormProps extends RouteProps, WithRouter {
    isAuth?: boolean;
    customerRegisterAction?: Function;
    getCustomerCartsAction?: Function;
    isLoading?: boolean;
    isCartLoading?: boolean;
    deliveryNewAddress?: IAddressFormState;
    billingNewAddress?: IAddressFormState;
    isMultipleAddressesLoading?: boolean;
    billingSelection?: IBillingSelectionState;
    addMultipleAddressAction?: (payload: IAddressItem, customerId: string, billing: IAddressItem) => void;
    customer?: string | null;
}

export interface ICheckoutRegisterFormState {
    password: string;
    confirmPassword: string;
    isCartLoading: boolean;
}

export interface IAddressPayload {
    address: IAddressFormState;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
}
