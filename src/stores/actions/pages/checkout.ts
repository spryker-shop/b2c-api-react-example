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
    CHECKOUT_MUTATE_DELIVERY_STEP,
    CHECKOUT_MUTATE_BILLING_STEP,
    CHECKOUT_MUTATE_SHIPMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_SECTION,
    CHECKOUT_MUTATE_CREDIT_CARD_FORM,
    CHECKOUT_MUTATE_INVOICE_FORM
} from '@stores/actionTypes/pages/checkout';
import { CheckoutService } from '@services/pages/Checkout';
import {
    ICheckoutRequest,
    IFormFieldMutate,
    IFormUpdatePaymentStatus
} from '@interfaces/checkout';
import { TOrderId } from '@interfaces/order';
import { ICheckoutResponseData, IPageCheckoutAction,
} from '@stores/reducers/pages/checkout/types';

export const getCheckoutDataInitPendingStateAction = (): IPageCheckoutAction => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_PENDING',
});

export const getCheckoutDataInitRejectedStateAction = (message: string):IPageCheckoutAction => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const getCheckoutDataInitFulfilledStateAction = (payload: ICheckoutResponseData): IPageCheckoutAction => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
    payloadGetFulfilled: payload,
});

export const getCheckoutDataAction = function (payload: ICheckoutRequest, anonymId: string): Function {
    return (dispatch: Function, getState: Function): void => {
        CheckoutService.getCheckoutData(dispatch, payload, anonymId);
    };
};

export const sendCheckoutDataPendingStateAction = (): IPageCheckoutAction => ({
    type: SEND_CHECKOUT_DATA + '_PENDING',
});

export const sendCheckoutDataRejectedStateAction = (message: string): IPageCheckoutAction => ({
    type: SEND_CHECKOUT_DATA + '_REJECTED',
    payloadRejected: {error: message},
});

export const sendCheckoutDataFulfilledStateAction = (orderId: TOrderId): IPageCheckoutAction => ({
    type: SEND_CHECKOUT_DATA + '_FULFILLED',
    payloadSendFulfilled: {orderId},
});

export const sendCheckoutDataAction = function (payload: ICheckoutRequest, anonymId: string): Function {
    return (dispatch: Function, getState: Function): void => {
        CheckoutService.sendOrderData(dispatch, payload, anonymId);
    };
};

export const mutateStateNewAddressDeliveryAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    payloadFormFieldMutate: payload
});

export const mutateStateNewAddressBillingAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_BILLING_ADDRESS,
    payloadFormFieldMutate: payload
});

export const mutateStateDeliverySelectionAddNewAction = (): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW
});

export const mutateStateBillingSelectionAddNewAction = (): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW
});

export const mutateStateDeliverySelectionAddressIdAction = (payload: string): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID,
    payloadCurrentSelection: payload,
});

export const mutateStateBillingSelectionAddressIdAction = (payload: string): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID,
    payloadCurrentSelection: payload,
});

export const mutateStateBillingSelectionSameAsDeliveryAction = (payload: boolean): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY,
    payloadSelectionSameAsDelivery: payload,
});

export const mutateDeliveryStepAction = (payload: boolean): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_DELIVERY_STEP,
    payloadUpdateSectionStatus: payload,
});

export const mutateBillingStepAction = (payload: boolean): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_BILLING_STEP,
    payloadUpdateSectionStatus: payload,
});

export const mutateShipmentMethodAction = (payload: string): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_SHIPMENT_METHOD,
    payloadCurrentSelection: payload,
});

export const mutatePaymentMethodAction = (payload: IFormUpdatePaymentStatus): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_PAYMENT_METHOD,
    payloadFormUpdatePaymentStatus: payload,
});

export const mutatePaymentSectionAction = (payload: boolean): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_PAYMENT_SECTION,
    payloadUpdateSectionStatus: payload,
});

export const mutateStateCreditCardAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_CREDIT_CARD_FORM,
    payloadFormFieldMutate: payload
});

export const mutateStateInvoiceFormAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: CHECKOUT_MUTATE_INVOICE_FORM,
    payloadFormFieldMutate: payload
});
