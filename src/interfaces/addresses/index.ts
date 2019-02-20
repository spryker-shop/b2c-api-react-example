import {
    TCustomerCellPhone,
    TCustomerEmail,
    TCustomerFirstName,
    TCustomerLastName,
    TCustomerMiddleName,
    TCustomerPoBox,
    TCustomerSalutation,
} from '@interfaces/customer';

export type TAddress = string;
export type TAddressZipCode = string;
export type TAddressCity = string;
export type TAddressCountry = string;
export type TAddressCompany = string;
export type TAddressPhone = string;
export type TIso2Code = string;

export interface IAddressCountryComposed {
    id_country: number;
    iso2_code: string;
    iso3_code: string;
    name: string;
    postal_code_mandatory: boolean;
    postal_code_regex: string;
    regions: object;
}

export type TAddressComment = string;
export type TAddressDescription = string;

interface IAbstractAddressItem {
    id?: string | null;
    salutation: TCustomerSalutation | null;
    firstName: TCustomerFirstName | null;
    lastName: TCustomerLastName | null;
    address1: TAddress | null;
    address2: TAddress | null;
    address3: TAddress | null;
    zipCode: TAddressZipCode | null;
    city: TAddressCity | null;
    company?: TAddressCompany | null;
    phone?: TAddressPhone | null;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
    iso2Code?: TIso2Code | null;
}

export interface IAddressItem extends IAbstractAddressItem {
    country?: TAddressCountry | null;
    email?: TCustomerEmail | null;
}

export interface IAddressItemCollection extends IAbstractAddressItem {
    country: IAddressCountryComposed;
    email?: TCustomerEmail;
}

export interface IAddressItemOrder extends IAbstractAddressItem {
    email: TCustomerEmail | null;
    country: TAddressCountry;
    cellPhone: TCustomerCellPhone | null;
    comment: TAddressComment | null;
    description: TAddressDescription | null;
    middleName: TCustomerMiddleName | null;
    poBox: TCustomerPoBox | null;
}
