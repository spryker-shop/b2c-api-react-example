import {
    ICheckoutFormsNames,
    ICheckoutPaymentMethodsNames,
    ICheckoutSelectionInputs,
    IBillingObjectConfigInputStable,
    ICreditCardObjectConfigInputStable,
    IDeliveryObjectConfigInputStable,
    IInvoiceObjectConfigInputStable
} from './types';

export const checkoutSelectionInputs: ICheckoutSelectionInputs = {
    isAddNewDeliveryValue: 'isAddNewDeliveryValue',
    isAddNewBillingValue: 'isAddNewBillingValue',
    isSameAsDeliveryValue: 'sameAsDelivery',
};

export const checkoutFormsNames: ICheckoutFormsNames = {
    billing: 'billing',
    delivery: 'delivery',
    invoice: 'invoice',
    creditCard: 'creditCard',
    savedDelivery: 'savedDelivery',
    sameAsDeliveryForm: 'sameAsDeliveryForm',
    savedBilling: 'savedBilling',
    shipmentMethodBase: 'shipmentMethod-',
    paymentMethod: 'paymentMethod',
};

export const checkoutPaymentMethodsNames: ICheckoutPaymentMethodsNames = {
    invoice: 'invoice',
    creditCard: 'credit card',
};

export const deliveryConfigInputStable: IDeliveryObjectConfigInputStable = {
    firstName: {
        isRequired: true,
        inputName: 'firstName',
    },
    lastName: {
        isRequired: true,
        inputName: 'lastName',
    },
    salutation: {
        isRequired: true,
        inputName: 'salutation',
    },
    address1: {
        isRequired: true,
        inputName: 'address1',
    },
    address2: {
        isRequired: true,
        inputName: 'address2',
    },
    address3: {
        isRequired: false,
        inputName: 'address3',
    },
    email: {
        isRequired: true,
        inputName: 'email',
    },
    zipCode: {
        isRequired: true,
        inputName: 'zipCode',
    },
    city: {
        isRequired: true,
        inputName: 'city',
    },
    country: {
        isRequired: true,
        inputName: 'country',
    },
    company: {
        isRequired: false,
        inputName: 'company',
    },
    phone: {
        isRequired: false,
        inputName: 'phone',
    },
};

export const billingConfigInputStable: IBillingObjectConfigInputStable = {
    ...deliveryConfigInputStable, email: {
        isRequired: false,
        inputName: 'email',
    },
};

export const invoiceConfigInputStable: IInvoiceObjectConfigInputStable = {
    dateOfBirth: {
        isRequired: true,
        inputName: 'dateOfBirth',
    },
};

export const creditCardConfigInputStable: ICreditCardObjectConfigInputStable = {
    paymentProvider: {
        isRequired: true,
        inputName: 'paymentProvider',
    },
    cardNumber: {
        isRequired: true,
        inputName: 'cardNumber',
    },
    cardName: {
        isRequired: true,
        inputName: 'cardName',
    },
    cardExpiryMonth: {
        isRequired: true,
        inputName: 'cardExpiryMonth',
    },
    cardExpiryYear: {
        isRequired: true,
        inputName: 'cardExpiryYear',
    },
    cardCVC: {
        isRequired: true,
        inputName: 'cardCVC',
    },
};
