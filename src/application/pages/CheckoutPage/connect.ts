import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { getCustomerReference, isUserAuthenticated } from '@stores/reducers/pages/login';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';
import { getCheckoutDataAction, sendCheckoutDataAction, clearCheckoutDataForm } from '@stores/actions/pages/checkout';
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
import { TCustomerReference } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartItem, TCartId } from '@interfaces/cart';
import {
    IBillingAddressState, IBillingSelectionState,
    ICheckoutRequest,
    ICheckoutStepsCompletionState,
    ICheckoutAddressState,
    IDeliverySelectionState,
    IPaymentMethod,
    IShipmentMethod
} from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);
    const isCheckoutLoading: boolean = isPageCheckoutStateLoading(state, ownProps);
    const isCheckoutInitiated: boolean = isPageCheckoutInitiated(state, ownProps);
    const {items}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);
    const isProductsExists = Boolean(items && items.length);
    const cartId: TCartId = getCartId(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);
    const profile = getCustomerProfile(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null = getAddressesCollectionFromCheckoutStore(
        state,
        ownProps
    );
    const orderId: string = getCreatedOrder(state, ownProps);
    const stepsCompletion: ICheckoutStepsCompletionState = state.pageCheckout.stepsCompletion;
    const deliveryNewAddress: ICheckoutAddressState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;
    const billingNewAddress: IBillingAddressState = state.pageCheckout.billingNewAddress;
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const paymentMethod: IPaymentMethod['paymentMethodName'] | null = state.pageCheckout.paymentMethod;
    const shipmentMethod: IShipmentMethod['id'] | null = state.pageCheckout.shipmentMethod;

    return ({
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
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getCheckoutData: (payload: ICheckoutRequest, anonymId: string): void => {
        dispatch(getCheckoutDataAction(payload, anonymId));
    },
    sendCheckoutData: (payload: ICheckoutRequest, anonymId: string): void => {
        dispatch(sendCheckoutDataAction(payload, anonymId));
    },
    getCustomerData: (customerReference: TCustomerReference): void => {
        dispatch(getCustomerProfileAction(customerReference));
    }
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
