import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { IBillingAddressState, IBillingSelectionState, ICheckoutAddressState } from '@interfaces/checkout';
import { IAddressItem } from '@interfaces/addresses';

export interface ICheckoutRegisterFormProps extends RouteProps, WithRouter {
    isAuth?: boolean;
    handleSubmitRegisterForm?: Function;
    getCustomerCart?: Function;
    isLoading?: boolean;
    isCartLoading?: boolean;
    deliveryNewAddress?: ICheckoutAddressState;
    billingNewAddress?: IBillingAddressState;
    isMultipleAddressesLoading?: boolean;
    billingSelection?: IBillingSelectionState;
    addAddress?: (payload: IAddressItem, customerId: string, billing: IAddressItem) => void;
    customer?: string | null;
}

export interface ICheckoutRegisterFormState {
    password: string;
    confirmPassword: string;
    isCartLoading: boolean;
}

export interface IAddressPayload {
    address: ICheckoutAddressState;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
}
