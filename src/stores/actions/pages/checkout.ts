import * as actionTypes from '@stores/actionTypes/pages/checkout';
import { CheckoutService } from '@services/pages/Checkout';
import { ICheckoutRequest, IFormFieldMutate, IFormUpdatePaymentStatus } from '@interfaces/checkout';
import { ICheckoutResponseData, IPageCheckoutAction } from '@stores/reducers/pages/checkout/types';

export const getCheckoutDataInitPendingStateAction = (): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_DATA_INIT_REQUEST + '_PENDING'
});

export const getCheckoutDataInitRejectedStateAction = (message: string): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const getCheckoutDataInitFulfilledStateAction = (payload: ICheckoutResponseData): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
    payloadGetFulfilled: payload
});

export const getCheckoutDataAction = (payload: ICheckoutRequest, anonymId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        CheckoutService.getCheckoutData(dispatch, payload, anonymId);
    };

export const sendCheckoutDataPendingStateAction = (): IPageCheckoutAction => ({
    type: actionTypes.SEND_CHECKOUT_DATA + '_PENDING'
});

export const sendCheckoutDataRejectedStateAction = (message: string): IPageCheckoutAction => ({
    type: actionTypes.SEND_CHECKOUT_DATA + '_REJECTED',
    payloadRejected: { error: message }
});

export const sendCheckoutDataFulfilledStateAction = (orderId: string): IPageCheckoutAction => ({
    type: actionTypes.SEND_CHECKOUT_DATA + '_FULFILLED',
    payloadSendFulfilled: { orderId }
});

export const sendCheckoutDataAction = (payload: ICheckoutRequest, anonymId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        CheckoutService.sendOrderData(dispatch, payload, anonymId);
    };

export const mutateStateNewAddressDeliveryAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    payloadFormFieldMutate: payload
});

export const mutateStateNewAddressBillingAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_BILLING_ADDRESS,
    payloadFormFieldMutate: payload
});

export const mutateStateDeliverySelectionAddNewAction = (): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW
});

export const mutateStateBillingSelectionAddNewAction = (): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW
});

export const mutateStateDeliverySelectionAddressIdAction = (payload: string): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID,
    payloadCurrentSelection: payload
});

export const mutateStateBillingSelectionAddressIdAction = (payload: string): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID,
    payloadCurrentSelection: payload
});

export const mutateStateBillingSelectionSameAsDeliveryAction = (payload: boolean): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY,
    payloadSelectionSameAsDelivery: payload
});

export const mutateDeliveryStepAction = (payload: boolean): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_DELIVERY_STEP,
    payloadUpdateSectionStatus: payload
});

export const mutateBillingStepAction = (payload: boolean): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_BILLING_STEP,
    payloadUpdateSectionStatus: payload
});

export const mutateShipmentMethodAction = (id: string, price: number): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_SHIPMENT_METHOD,
    payloadCurrentMethodSelection: { id, price }
});

export const mutatePaymentMethodAction = (payload: IFormUpdatePaymentStatus): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_PAYMENT_METHOD,
    payloadFormUpdatePaymentStatus: payload
});

export const mutatePaymentSectionAction = (payload: boolean): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_PAYMENT_SECTION,
    payloadUpdateSectionStatus: payload
});

export const mutateStateCreditCardAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_CREDIT_CARD_FORM,
    payloadFormFieldMutate: payload
});

export const mutateStateInvoiceFormAction = (payload: IFormFieldMutate): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_MUTATE_INVOICE_FORM,
    payloadFormFieldMutate: payload
});

export const clearCheckoutDataForm = (): IPageCheckoutAction => ({
    type: actionTypes.CHECKOUT_CLEAR_DATA_FORM
});
