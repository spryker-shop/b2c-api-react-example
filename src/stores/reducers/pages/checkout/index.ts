import * as actionTypes  from '@stores/actionTypes/pages/checkout';
import * as checkoutHandlers  from './handlers';
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

export const pageCheckout = function (
    state: ICheckoutState = initialState,
    action: IPageCheckoutAction
): ICheckoutState {
    switch (action.type) {
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
        case `${actionTypes.SEND_CHECKOUT_DATA}_PENDING`:
            return checkoutHandlers.handleCheckoutPending(state);
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
        case `${actionTypes.SEND_CHECKOUT_DATA}_REJECTED`:
            draft.data.orderId = '';
            draft.error = action.payloadRejected.error;
            draft.pending = false;
            draft.fulfilled = false;
            draft.rejected = true;
            draft.initiated = false;
            break;
        case `${actionTypes.CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
            draft.data.payments = action.payloadGetFulfilled.payments || null;
            draft.data.shipments = action.payloadGetFulfilled.shipments || null;
            draft.data.addressesCollection = action.payloadGetFulfilled.addressesCollection || null;

            draft.error = null;
            draft.pending = false;
            draft.fulfilled = true;
            draft.rejected = false;
            draft.initiated = true;
            break;
        case `${actionTypes.SEND_CHECKOUT_DATA}_FULFILLED`: {
            draft.data.orderId = action.payloadSendFulfilled.orderId;
            draft.error = null;
            draft.pending = false;
            draft.fulfilled = true;
            draft.rejected = false;
            draft.initiated = true;
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_ADDRESS: {
            draft.deliveryNewAddress = {
                ...draft.deliveryNewAddress,
                [action.payloadFormFieldMutate.key]: {
                    value: action.payloadFormFieldMutate.value,
                    isError: action.payloadFormFieldMutate.isError
                }
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW: {
            draft.deliverySelection = {
                selectedAddressId: null,
                isAddNew: true
            };
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isAddressStepPassed: false
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID: {
            draft.deliverySelection = {
                selectedAddressId: action.payloadCurrentSelection,
                isAddNew: false
            };
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isAddressStepPassed: true
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_DELIVERY_STEP: {
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isAddressStepPassed: action.payloadUpdateSectionStatus
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW: {
            draft.billingSelection = {
                selectedAddressId: null,
                isAddNew: true,
                isSameAsDelivery: false
            };
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isBillingStepPassed: false
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID: {
            draft.billingSelection = {
                selectedAddressId: action.payloadCurrentSelection,
                isAddNew: false,
                isSameAsDelivery: false
            };
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isBillingStepPassed: true
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY: {
            draft.billingSelection = {
                selectedAddressId: null,
                isAddNew: false,
                isSameAsDelivery: action.payloadSelectionSameAsDelivery
            };
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isBillingStepPassed: action.payloadSelectionSameAsDelivery
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_BILLING_STEP: {
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isBillingStepPassed: action.payloadUpdateSectionStatus
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_BILLING_ADDRESS: {
            draft.billingNewAddress = {
                ...draft.billingNewAddress,
                [action.payloadFormFieldMutate.key]: {
                    value: action.payloadFormFieldMutate.value,
                    isError: action.payloadFormFieldMutate.isError
                }
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_SHIPMENT_METHOD: {
            draft.shipmentMethod = action.payloadCurrentSelection;
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isShipmentStepPassed: true
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_PAYMENT_METHOD: {
            draft.paymentMethod = action.payloadFormUpdatePaymentStatus.value;
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isPaymentStepPassed: action.payloadFormUpdatePaymentStatus.isPaymentStepCompleted
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_PAYMENT_SECTION: {
            draft.stepsCompletion = {
                ...draft.stepsCompletion,
                isPaymentStepPassed: action.payloadUpdateSectionStatus
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_CREDIT_CARD_FORM: {
            draft.paymentCreditCardData = {
                ...draft.paymentCreditCardData,
                [action.payloadFormFieldMutate.key]: {
                    value: action.payloadFormFieldMutate.value,
                    isError: action.payloadFormFieldMutate.isError
                }
            };
            break;
        }
        case actionTypes.CHECKOUT_MUTATE_INVOICE_FORM: {
            draft.paymentInvoiceData = {
                ...draft.paymentInvoiceData,
                [action.payloadFormFieldMutate.key]: {
                    value: action.payloadFormFieldMutate.value,
                    isError: action.payloadFormFieldMutate.isError
                }
            };
            break;
        }
        case actionTypes.CHECKOUT_CLEAR_DATA_FORM: {
            return initialState;
        }
        default:
            break;
    }
};
