import { IAddressItem } from '@interfaces/addresses';
import { IAddressFormState, IFormStateIndexSignature, IFormInputIndexSignature } from '@interfaces/forms';
import { checkFormInputValidity, checkFormValidity } from './validation';

export const getAddressForm = (address: IAddressFormState): IAddressItem => {
    let payloadAddress: IAddressItem = {};

    Object.keys(address).map((field: string) => {
        const { value } = address[field];
        payloadAddress = { ...payloadAddress, [field]: typeof value === 'string' ? value.trim() : value };
    });

    payloadAddress = { ...payloadAddress, iso2Code: payloadAddress.country };
    delete payloadAddress.country;

    return payloadAddress;
};

const charsLimit = (value: string, max: string): string => {
    if (value.length === 1 && value[0] > max[0]) {
        value = '0' + value;
    }

    if (value.length === 2) {
        if (Number(value) === 0) {
            value = '01';
        } else if (value > max) {
            value = max;
        }
    }

    return value;
};

export const cardExpiryFormat = (value: string): string => {
    const month: string = charsLimit(value.substring(0, 2), '12');
    const year: string = value.substring(2, 4);
    const isMonthFulfilled: boolean = value.length >= 2;

    return `${month}${isMonthFulfilled ? `/${year}` : ''}`;
};

export const dateBirthFormat = (value: string): string => {
    const days: string = charsLimit(value.substring(0, 2), '31');
    const month: string = charsLimit(value.substring(2, 4), '12');
    const year: string = value.substring(4, 8);
    const isMonthFulfilled: boolean = value.length >= 4;
    const isDaysFulfilled: boolean = value.length >= 2;

    return `${days}${isDaysFulfilled ? `/${month}` : ''}${isMonthFulfilled ? `/${year}` : ''}`;
};

export const formDataTransformer = (fields: IFormStateIndexSignature): object => Object.keys(fields)
    .reduce((accumulator: IFormInputIndexSignature, name: string) => {
        accumulator[name] = fields[name].value;

        return accumulator;
    }, {});

export {
    checkFormInputValidity,
    checkFormValidity
};
