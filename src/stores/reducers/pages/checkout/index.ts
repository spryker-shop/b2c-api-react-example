import produce from 'immer';
import {
    CHECKOUT_DATA_INIT_REQUEST,
    SEND_CHECKOUT_DATA,
    CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW,
    CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID,
    CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW,
    CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID,
    CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY,
    CHECKOUT_MUTATE_BILLING_ADDRESS,
    CHECKOUT_MUTATE_SHIPMENT_METHOD,
    CHECKOUT_MUTATE_DELIVERY_STEP,
    CHECKOUT_MUTATE_BILLING_STEP,
    CHECKOUT_MUTATE_PAYMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_SECTION,
    CHECKOUT_MUTATE_INVOICE_FORM,
    CHECKOUT_MUTATE_CREDIT_CARD_FORM
} from '@stores/actionTypes/pages/checkout';
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
    }
};

export const pageCheckout = produce<ICheckoutState>(
    (draft: ICheckoutState, action: IPageCheckoutAction) => {
        switch (action.type) {
            case `${CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
            case `${SEND_CHECKOUT_DATA}_PENDING`:
                draft.data.orderId = '';
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = false;
                break;
            case `${CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
            case `${SEND_CHECKOUT_DATA}_REJECTED`:
                draft.data.orderId = '';
                draft.error = action.payloadRejected.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                draft.initiated = false;
                break;
            case `${CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
                draft.data.payments = action.payloadGetFulfilled.payments || null;
                draft.data.shipments = action.payloadGetFulfilled.shipments || null;
                draft.data.addressesCollection = action.payloadGetFulfilled.addressesCollection || null;

                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${SEND_CHECKOUT_DATA}_FULFILLED`: {
                draft.data.orderId = action.payloadSendFulfilled.orderId;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_ADDRESS: {
                draft.deliveryNewAddress = {
                    ...draft.deliveryNewAddress,
                    [action.payloadFormFieldMutate.key]: {
                        value: action.payloadFormFieldMutate.value,
                        isError: action.payloadFormFieldMutate.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW: {
                draft.deliverySelection = {
                    selectedAddressId: null,
                    isAddNew: true
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutAddressStep: false
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID: {
                draft.deliverySelection = {
                    selectedAddressId: action.payloadCurrentSelection,
                    isAddNew: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutAddressStep: true
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_STEP: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutAddressStep: action.payloadUpdateSectionStatus
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW: {
                draft.billingSelection = {
                    selectedAddressId: null,
                    isAddNew: true,
                    isSameAsDelivery: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutBillingStep: false
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID: {
                draft.billingSelection = {
                    selectedAddressId: action.payloadCurrentSelection,
                    isAddNew: false,
                    isSameAsDelivery: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutBillingStep: true
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY: {
                draft.billingSelection = {
                    selectedAddressId: null,
                    isAddNew: false,
                    isSameAsDelivery: true
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutBillingStep: true
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_STEP: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutBillingStep: action.payloadUpdateSectionStatus
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_ADDRESS: {
                draft.billingNewAddress = {
                    ...draft.billingNewAddress,
                    [action.payloadFormFieldMutate.key]: {
                        value: action.payloadFormFieldMutate.value,
                        isError: action.payloadFormFieldMutate.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_SHIPMENT_METHOD: {
                draft.shipmentMethod = action.payloadCurrentSelection;
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutShipmentStep: true
                };
                break;
            }
            case CHECKOUT_MUTATE_PAYMENT_METHOD: {
                draft.paymentMethod = action.payloadFormUpdatePaymentStatus.value;
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutPaymentStep: action.payloadFormUpdatePaymentStatus.isSummaryStepCompleted
                };
                break;
            }
            case CHECKOUT_MUTATE_PAYMENT_SECTION: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    checkoutPaymentStep: action.payloadUpdateSectionStatus
                };
                break;
            }
            case CHECKOUT_MUTATE_CREDIT_CARD_FORM: {
                draft.paymentCreditCardData = {
                    ...draft.paymentCreditCardData,
                    [action.payloadFormFieldMutate.key]: {
                        value: action.payloadFormFieldMutate.value,
                        isError: action.payloadFormFieldMutate.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_INVOICE_FORM: {
                draft.paymentInvoiceData = {
                    ...draft.paymentInvoiceData,
                    [action.payloadFormFieldMutate.key]: {
                        value: action.payloadFormFieldMutate.value,
                        isError: action.payloadFormFieldMutate.isError
                    }
                };
                break;
            }
            default:
                break;
        }
    },
    initialState
);
