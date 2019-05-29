export interface IAddressIndexSignture {
    [index: string]: string | number | boolean;
}

export interface IAddressCountryComposed {
    id_country: number;
    iso2_code: string;
    iso3_code: string;
    name: string;
    postal_code_mandatory: boolean;
    postal_code_regex: string;
    regions: object;
}

interface IAbstractAddressItem {
    id?: string;
    salutation?: string;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    zipCode?: string;
    city?: string;
    company?: string;
    phone?: string;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
    iso2Code?: string | number | boolean;
}

export interface IAddressItem extends IAbstractAddressItem, IAddressIndexSignture {
    country?: string;
    email?: string;
}

export interface IAddressItemCollection extends IAbstractAddressItem {
    country: IAddressCountryComposed;
    email?: string;
}

export interface IAddressItemOrder extends IAbstractAddressItem {
    email?: string;
    country: string;
    cellPhone?: string;
    comment?: string;
    description?: string;
    middleName?: string;
    poBox?: string;
}

export interface ICountry {
    iso2Code: string;
    iso3Code: string;
    name: string;
    postalCodeMandatory: boolean;
    postalCodeRegex: string;
}
