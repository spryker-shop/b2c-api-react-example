import * as actionTypes  from '@stores/actionTypes/pages/checkout';
import * as checkoutHandlers  from '@stores/reducers/pages/checkout/handlers';
import { ICheckoutState, IPageCheckoutAction } from '@stores/reducers/pages/checkout/types';
import {
    deliverySelectionDefault,
    deliveryNewAddressDefault,
    stepCompletionCheckoutDefault,
    billingSelectionDefault,
    billingNewAddressDefault,
    paymentCreditCardDefault,
    paymentInvoiceDefault
} from './initialState';

export const initialState: ICheckoutState = {
    deliveryNewAddress: {...deliveryNewAddressDefault},
    deliverySelection: {...deliverySelectionDefault},
    billingSelection: {...billingSelectionDefault},
    billingNewAddress: {...billingNewAddressDefault},
    stepsCompletion: {...stepCompletionCheckoutDefault},
    shipmentMethod: null,
    shipmentMethodPrice: 0,
    paymentMethod: null,
    paymentCreditCardData: {...paymentCreditCardDefault},
    paymentInvoiceData: {...paymentInvoiceDefault},
    data: {
        payments: [],
        shipments: [],
        addressesCollection: [],
        orderId: ''
    },
    error: null,
    pending: true,
    fulfilled: false,
    rejected: false,
    initiated: false
};

export const pageCheckout = (
    state: ICheckoutState = initialState,
    action: IPageCheckoutAction
): ICheckoutState => {
    switch (action.type) {
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
        case `${actionTypes.SEND_CHECKOUT_DATA}_PENDING`:
            return checkoutHandlers.handleCheckoutPending(state);
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
        case `${actionTypes.SEND_CHECKOUT_DATA}_REJECTED`:
            return checkoutHandlers.handleCheckoutRejected(state, action.payloadRejected);
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
            return checkoutHandlers.handleCheckoutFulfilled(state, action.payloadGetFulfilled);
        case `${actionTypes.SEND_CHECKOUT_DATA}_FULFILLED`:
            return checkoutHandlers.handleSendCheckoutDataFulfilled(state, action.payloadSendFulfilled.orderId);
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_ADDRESS:
            return checkoutHandlers.handleMutateCheckoutDeliveryAddress(state, action.payloadFormFieldMutate);
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW:
            return checkoutHandlers.handleMutateCheckoutDeliverySelectionAddNew(state);
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID:
            return checkoutHandlers.handleMutateCheckoutDeliveryAddressId(state, action.payloadCurrentSelection);
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_STEP:
            return checkoutHandlers.handleMutateCheckoutStep(
                state,
                action.payloadUpdateSectionStatus,
                'isAddressStepPassed'
            );
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW:
            return checkoutHandlers.handleMutateCheckoutBillingSelectionAddNew(state);
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID:
            return checkoutHandlers.handleMutateCheckoutBillingAddressId(state, action.payloadCurrentSelection);
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY:
            return checkoutHandlers.handleMutateCheckoutSameAsDelivery(state, action.payloadSelectionSameAsDelivery);
        case actionTypes.CHECKOUT_MUTATE_BILLING_STEP:
            return checkoutHandlers.handleMutateCheckoutStep(
                state,
                action.payloadUpdateSectionStatus,
                'isBillingStepPassed'
            );
        case actionTypes.CHECKOUT_MUTATE_BILLING_ADDRESS:
            return checkoutHandlers.handleMutateCheckoutBillingAddress(state, action.payloadFormFieldMutate);
        case actionTypes.CHECKOUT_MUTATE_SHIPMENT_METHOD:
            return checkoutHandlers.handleMutateCheckoutShipmentMethod(state, action.payloadCurrentMethodSelection);
        case actionTypes.CHECKOUT_MUTATE_PAYMENT_METHOD:
            return checkoutHandlers.handleMutateCheckoutPaymentMethod(state, action.payloadFormUpdatePaymentStatus);
        case actionTypes.CHECKOUT_MUTATE_PAYMENT_SECTION:
            return checkoutHandlers.handleMutateCheckoutStep(
                state,
                action.payloadUpdateSectionStatus,
                'isPaymentStepPassed'
            );
        case actionTypes.CHECKOUT_MUTATE_CREDIT_CARD_FORM:
            return checkoutHandlers.handleMutateCheckoutCreditCardForm(state, action.payloadFormFieldMutate);
        case actionTypes.CHECKOUT_MUTATE_INVOICE_FORM:
            return checkoutHandlers.handleMutateCheckoutInvoiceForm(state, action.payloadFormFieldMutate);
        case actionTypes.CHECKOUT_CLEAR_DATA_FORM:
            return initialState;
        default:
            return state;
    }
};
