import { IAddressRawResponseOneValue } from '@services/pages/Addresses/types';
import { IAddressItem } from '@interfaces/addresses';

export const parseOneAddressRawResponse = (response: IAddressRawResponseOneValue): IAddressItem | null => {
    if (!response) {
        return null;
    }
    const {data, data: {attributes, id}} = response;
    const result: IAddressItem = {
        id: null,
        salutation:  null,
        firstName:  null,
        lastName:  null,
        address1:  null,
        address2:  null,
        address3:  null,
        zipCode:  null,
        city:  null,
        company:  null,
        phone:  null,
        isDefaultShipping: false,
        isDefaultBilling: false,
        iso2Code: null,
        country:  null,
        email:  null,
    };

    if (!attributes) {
        return null;
    }

    result.id = id;
    if (attributes.salutation) {
        result.salutation = attributes.salutation;
    }
    if (attributes.firstName) {
        result.firstName = attributes.firstName;
    }
    if (attributes.lastName) {
        result.lastName = attributes.lastName;
    }
    if (attributes.address1) {
        result.address1 = attributes.address1;
    }
    if (attributes.address2) {
        result.address2 = attributes.address2;
    }
    if (attributes.address3) {
        result.address3 = attributes.address3;
    }
    if (attributes.zipCode) {
        result.zipCode = attributes.zipCode;
    }
    if (attributes.city) {
        result.city = attributes.city;
    }
    if (attributes.company) {
        result.company = attributes.company;
    }
    if (attributes.phone) {
        result.phone = attributes.phone;
    }
    if (attributes.isDefaultShipping) {
        result.isDefaultShipping = attributes.isDefaultShipping;
    }
    if (attributes.isDefaultBilling) {
        result.isDefaultBilling = attributes.isDefaultBilling;
    }
    if (attributes.iso2Code) {
        result.iso2Code = attributes.iso2Code;
    }
    if (attributes.country) {
        result.country = attributes.country;
    }
    if (attributes.email) {
        result.email = attributes.email;
    }

    return result;
};
