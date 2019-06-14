import { ICustomerAddressState } from './types';

export const initialState: ICustomerAddressState = {
    fields: {
        salutation: {
            value: ' ',
            isError: false
        },
        firstName: {
            value: '',
            isError: false
        },
        lastName: {
            value: '',
            isError: false
        },
        company: {
            value: '',
            isError: false
        },
        address1: {
            value: '',
            isError: false
        },
        address2: {
            value: '',
            isError: false
        },
        address3: {
            value: '',
            isError: false
        },
        city: {
            value: '',
            isError: false
        },
        zipCode: {
            value: '',
            isError: false
        },
        country: {
            value: ' ',
            isError: false
        },
        phone: {
            value: '',
            isError: false
        },
        isDefaultShipping: {
            value: false
        },
        isDefaultBilling: {
            value: false
        },
    },
    isSubmitted: false,
    isFormValid: false
};
