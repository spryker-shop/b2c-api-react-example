import { ICheckoutAddressState } from '@interfaces/checkout';
import { IAddressItem } from '@interfaces/addresses';

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

const limit = (val: string, max: string): string => {
    if (val.length === 1 && val[0] > max[0]) {
        val = '0' + val;
    }

    if (val.length === 2) {
        if (Number(val) === 0) {
            val = '01';
        } else if (val > max) {
            val = max;
        }
    }

    return val;
};

export const cardExpiryFormat = (val: string): string => {
    const month = limit(val.substring(0, 2), '12');
    const year = val.substring(2, 4);
    const isMonthFulfilled = val.length >= 2;

    return `${month}${isMonthFulfilled ? `/${year}` : ''}`;
};

export const dateBirthFormat = (val: string): string => {
    const days = limit(val.substring(0, 2), '31');
    const month = limit(val.substring(2, 4), '12');
    const year = val.substring(4, 8);
    const isMonthFulfilled = val.length >= 4;
    const isDaysFulfilled = val.length >= 2;

    return `${days}${isDaysFulfilled ? `/${month}` : ''}${isMonthFulfilled ? `/${year}` : ''}`;
};
