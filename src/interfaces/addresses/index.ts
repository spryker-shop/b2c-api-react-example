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
    id?: string | null;
    salutation?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    address1?: string | null;
    address2?: string | null;
    address3?: string | null;
    zipCode?: string | null;
    city?: string | null;
    company?: string | null;
    phone?: string | null;
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
    iso2Code?: string | number | boolean | null;
}

export interface IAddressItem extends IAbstractAddressItem {
    country?: string | null;
    email?: string | null;
    [index: string]: string | number | boolean;
}

export interface IAddressItemCollection extends IAbstractAddressItem {
    country: IAddressCountryComposed;
    email?: string;
}

export interface IAddressItemOrder extends IAbstractAddressItem {
    email: string | null;
    country: string;
    cellPhone: string | null;
    comment: string | null;
    description: string | null;
    middleName: string | null;
    poBox: string | null;
}
