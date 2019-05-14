import { reduxify } from '@hoc/Reduxify';
import { getCustomerReference, isPageLoginStateLoading, isUserAuthenticated } from '@stores/reducers/pages/login';
import { customerRegisterAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerProfile } from '@interfaces/customer';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IAddressItem } from '@interfaces/addresses';
import { addMultipleAddressAction } from '@stores/actions/pages/addresses';
import { IBillingAddressState, IBillingSelectionState, ICheckoutAddressState } from '@interfaces/checkout';
import { isPageAddressesStateLoading } from '@stores/reducers/pages/addresses/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading = isCartStateLoading(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const isAddressLoading: boolean = isPageAddressesStateLoading(state, ownProps) ?
        isPageAddressesStateLoading(state, ownProps) : false;
    const billingNewAddress: IBillingAddressState = state.pageCheckout.billingNewAddress;
    const deliveryNewAddress: ICheckoutAddressState = state.pageCheckout.deliveryNewAddress;

    return ({
        isAuth,
        isLoading,
        isCartLoading,
        customer,
        billingSelection,
        isAddressLoading,
        billingNewAddress,
        deliveryNewAddress
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
