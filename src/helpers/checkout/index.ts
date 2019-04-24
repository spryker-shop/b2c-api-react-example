import { ICheckoutAddressState } from '@interfaces/checkout';
import { IAddressItem } from '@interfaces/addresses';
import { IParamFormValidity, IParamInputValidity } from './types';
import { RegExpZipCode } from '@constants/forms/regexp';

export const addressDefault: IAddressItem = {
    firstName: '',
    lastName: '',
    salutation: '',
    address1: '',
    address2: '',
    address3: '',
    zipCode: '',
    city: '',
    country: '',
    company: '',
    phone: ''
};

export const checkFormInputValidity = (param: IParamInputValidity): boolean => {
    const { value, fieldConfig } = param;
    if (!value && fieldConfig.isRequired) {
        return false;
    }
    if (fieldConfig.inputName === 'zipCode' && typeof value === 'string') {
        const regExp = new RegExp(RegExpZipCode);

        return regExp.test(value);
    }

    return true;
};

export const checkFormValidity = (param: IParamFormValidity): boolean => {
    const { form, fieldsConfig } = param;
    let result: boolean = true;

    for (const field in form) {
        const { value } = form[field];
        const cleanValue = typeof value === 'string' ? value.trim() : value;

        if (form[field].isError || (fieldsConfig[field].isRequired && !cleanValue)) {
            result = false;
        }
    }

    return result;
};

export const getAddressForm = (address: ICheckoutAddressState): IAddressItem => {
    let payloadAddress: IAddressItem = addressDefault;

    Object.keys(address).map((field: string) => {
        const { value } = address[field];
        payloadAddress = { ...payloadAddress, [field]: typeof value === 'string' ? value.trim() : value };
    });

    payloadAddress = { ...payloadAddress, iso2Code: payloadAddress.country };
    delete payloadAddress.country;

    return payloadAddress;
};
