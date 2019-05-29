import {
    ICheckoutFormsNames,
    ICheckoutPaymentMethodsNames,
    ICheckoutSelectionInputs,
    IFormConfigInputStable
} from '@interfaces/forms';

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

export const newAddressConfigInputStable: IFormConfigInputStable = {
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
        isEmail: true
    },
    zipCode: {
        isRequired: true,
        inputName: 'zipCode',
        minLength: 5
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

export const invoiceConfigInputStable: IFormConfigInputStable = {
    dateOfBirth: {
        isRequired: true,
        inputName: 'dateOfBirth',
        minLength: 8
    },
};

export const creditCardConfigInputStable: IFormConfigInputStable = {
    paymentProvider: {
        isRequired: true,
        inputName: 'paymentProvider',
    },
    cardNumber: {
        isRequired: true,
        inputName: 'cardNumber',
        minLength: 16
    },
    cardName: {
        isRequired: true,
        inputName: 'cardName',
    },
    cardExpiryDate: {
        isRequired: true,
        inputName: 'cardExpiryDate',
        minLength: 4
    },
    cardCVC: {
        isRequired: true,
        inputName: 'cardCVC',
        minLength: 3
    },
};
