import { reduxify } from '@hoc/Reduxify';
import { getCustomerReference, isPageLoginStateLoading, isUserAuthenticated } from '@stores/reducers/pages/login';
import { customerRegisterAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerProfile } from '@interfaces/customer';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IAddressItem } from '@interfaces/addresses';
import { addMultipleAddressAction } from '@stores/actions/pages/addresses';
import { IBillingSelectionState } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading = isCartStateLoading(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const billingNewAddress: IAddressFormState = state.pageCheckout.billingNewAddress;
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const isMultipleAddressesLoading = state.pageAddresses.data.isMultipleAddressesLoading;

    return ({
        isAuth,
        isLoading,
        isCartLoading,
        customer,
        billingSelection,
        billingNewAddress,
        deliveryNewAddress,
        isMultipleAddressesLoading
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    handleSubmitRegisterForm: (data: ICustomerProfile): void => dispatch(customerRegisterAction(data)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
    addAddress: (payload: IAddressItem, customerId: string, billing: IAddressItem) =>
        dispatch(addMultipleAddressAction(payload, customerId, billing)),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
