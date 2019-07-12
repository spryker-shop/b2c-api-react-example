import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ICheckoutResponseData, ICheckoutState } from '@stores/reducers/pages/checkout/types';
import { IFormFieldMutate, IFormUpdatePaymentStatus } from '@interfaces/checkout';

export const handleCheckoutPending = (state: ICheckoutState): ICheckoutState => ({
    ...state,
    data: {
        ...state.data,
        orderId: ''
    },
    ...getReducerPartPending()
});

export const handleCheckoutRejected = (state: ICheckoutState, payload: IApiErrorResponse) => ({
    ...state,
    data: {
        ...state.data,
        orderId: ''
    },
    ...getReducerPartRejected(payload.error)
});

export const handleCheckoutFulfilled = (state: ICheckoutState, payload: ICheckoutResponseData) => ({
    ...state,
    data: {
        ...state.data,
        payments: payload.payments,
        shipments: payload.shipments,
        addressesCollection: payload.addressesCollection
    },
    ...getReducerPartFulfilled()
});

export const handleSendCheckoutDataFulfilled = (state: ICheckoutState, orderId: string) => ({
    ...state,
    data: {
        ...state.data,
        orderId
    },
    ...getReducerPartFulfilled()
});

export const handleMutateCheckoutDeliveryAddress = (state: ICheckoutState, payload: IFormFieldMutate) => ({
    ...state,
    deliveryNewAddress: {
        ...state.deliveryNewAddress,
        [payload.key]: {
            value: payload.value,
            isError: payload.isError
        }
    }
});

export const handleMutateCheckoutBillingAddress = (state: ICheckoutState, payload: IFormFieldMutate) => ({
    ...state,
    billingNewAddress: {
        ...state.billingNewAddress,
        [payload.key]: {
            value: payload.value,
            isError: payload.isError
        }
    }
});

export const handleMutateCheckoutCreditCardForm = (state: ICheckoutState, payload: IFormFieldMutate) => ({
    ...state,
    paymentCreditCardData: {
        ...state.paymentCreditCardData,
        [payload.key]: {
            value: payload.value,
            isError: payload.isError
        }
    }
});

export const handleMutateCheckoutInvoiceForm = (state: ICheckoutState, payload: IFormFieldMutate) => ({
    ...state,
    paymentInvoiceData: {
        ...state.paymentInvoiceData,
        [payload.key]: {
            value: payload.value,
            isError: payload.isError
        }
    }
});

export const handleMutateCheckoutDeliverySelectionAddNew = (state: ICheckoutState) => ({
    ...state,
    deliverySelection: {
        selectedAddressId: null as null,
        isAddNew: true
    },
    stepsCompletion: {
        ...state.stepsCompletion,
        isAddressStepPassed: false
    }
});

export const handleMutateCheckoutDeliveryAddressId = (state: ICheckoutState, payload: string) => ({
    ...state,
    deliverySelection: {
        selectedAddressId: payload,
        isAddNew: false
    },
    stepsCompletion: {
        ...state.stepsCompletion,
        isAddressStepPassed: true
    }
});

export const handleMutateCheckoutBillingSelectionAddNew = (state: ICheckoutState) => ({
    ...state,
    billingSelection: {
        selectedAddressId: null as null,
        isAddNew: true,
        isSameAsDelivery: false
    },
    stepsCompletion: {
        ...state.stepsCompletion,
        isBillingStepPassed: false
    }
});

export const handleMutateCheckoutBillingAddressId = (state: ICheckoutState, payload: string) => ({
    ...state,
    billingSelection: {
        selectedAddressId: payload,
        isAddNew: false,
        isSameAsDelivery: false
    },
    stepsCompletion: {
        ...state.stepsCompletion,
        isBillingStepPassed: true
    }
});

export const handleMutateCheckoutSameAsDelivery = (state: ICheckoutState, payloadSelectionSameAsDelivery: boolean) => ({
    ...state,
    billingSelection: {
        selectedAddressId: null as null,
        isAddNew: false,
        isSameAsDelivery: payloadSelectionSameAsDelivery
    },
    stepsCompletion: {
        ...state.stepsCompletion,
        isBillingStepPassed: payloadSelectionSameAsDelivery
    }
});

export const handleMutateCheckoutStep = (state: ICheckoutState, payload: boolean, key: string) => ({
    ...state,
    stepsCompletion: {
        ...state.stepsCompletion,
        [key]: payload
    }
});

export const handleMutateCheckoutShipmentMethod = (
    state: ICheckoutState,
    payload: {  id: string, price: number  }
) => ({
    ...state,
    shipmentMethod: payload.id,
    shipmentMethodPrice: payload.price,
    stepsCompletion: {
        ...state.stepsCompletion,
        isShipmentStepPassed: true
    }
});

export const handleMutateCheckoutPaymentMethod = (state: ICheckoutState, payload: IFormUpdatePaymentStatus) => ({
    ...state,
    paymentMethod: payload.value,
    stepsCompletion: {
        ...state.stepsCompletion,
        isPaymentStepPassed: payload.isPaymentStepCompleted
    }
});
