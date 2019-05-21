import { IAddressItem } from '@interfaces/addresses';
import { IAddressFormState } from '@interfaces/forms';

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

export const getAddressForm = (address: IAddressFormState): IAddressItem => {
    let payloadAddress: IAddressItem = addressDefault;

    Object.keys(address).map((field: string) => {
        const { value } = address[field];
        payloadAddress = { ...payloadAddress, [field]: typeof value === 'string' ? value.trim() : value };
    });

    payloadAddress = { ...payloadAddress, iso2Code: payloadAddress.country };
    delete payloadAddress.country;

    return payloadAddress;
};

const limit = (value: string, max: string): string => {
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
    const month = limit(value.substring(0, 2), '12');
    const year = value.substring(2, 4);
    const isMonthFulfilled = value.length >= 2;

    return `${month}${isMonthFulfilled ? `/${year}` : ''}`;
};

export const dateBirthFormat = (value: string): string => {
    const days = limit(value.substring(0, 2), '31');
    const month = limit(value.substring(2, 4), '12');
    const year = value.substring(4, 8);
    const isMonthFulfilled = value.length >= 4;
    const isDaysFulfilled = value.length >= 2;

    return `${days}${isDaysFulfilled ? `/${month}` : ''}${isMonthFulfilled ? `/${year}` : ''}`;
};
