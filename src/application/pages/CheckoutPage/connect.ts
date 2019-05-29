import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { getCustomerReference, isUserAuthenticated } from '@stores/reducers/pages/login';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';
import { getCheckoutDataAction, sendCheckoutDataAction } from '@stores/actions/pages/checkout';
import {
    getAddressesCollectionFromCheckoutStore,
    getCreatedOrder,
    isPageCheckoutFulfilled,
    isPageCheckoutStateLoading,
    isPageCheckoutInitiated
} from '@stores/reducers/pages/checkout/selectors';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCartId, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartItem } from '@interfaces/cart';
import {
    IBillingSelectionState,
    ICheckoutStepsCompletionState,
    IDeliverySelectionState,
    IPaymentMethod,
    IShipmentMethod
} from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);
    const isCheckoutLoading: boolean = isPageCheckoutStateLoading(state, ownProps);
    const isCheckoutInitiated: boolean = isPageCheckoutInitiated(state, ownProps);
    const {items}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);
    const isProductsExists = Boolean(items && items.length);
    const cartId: string = getCartId(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);
    const profile = getCustomerProfile(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null = getAddressesCollectionFromCheckoutStore(
        state,
        ownProps
    );
    const orderId: string = getCreatedOrder(state, ownProps);
    const stepsCompletion: ICheckoutStepsCompletionState = state.pageCheckout.stepsCompletion;
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;
    const billingNewAddress: IAddressFormState = state.pageCheckout.billingNewAddress;
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const paymentMethod: IPaymentMethod['paymentMethodName'] | null = state.pageCheckout.paymentMethod;
    const shipmentMethod: IShipmentMethod['id'] | null = state.pageCheckout.shipmentMethod;

    return {
        isCheckoutInitiated,
        isUserLoggedIn,
        isCheckoutFulfilled,
        isCheckoutLoading,
        isProductsExists,
        cartId,
        customerReference,
        addressesCollection,
        orderId,
        profile,
        anonymId,
        stepsCompletion,
        deliveryNewAddress,
        deliverySelection,
        billingNewAddress,
        billingSelection,
        paymentMethod,
        shipmentMethod
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getCheckoutDataAction,
    sendCheckoutDataAction,
    getCustomerProfileAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
