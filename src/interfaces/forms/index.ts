export interface IConfigInputState {
    value: string | number | boolean;
    isError?: boolean;
}

export interface IConfigInputStable {
    inputName: string;
    isRequired?: boolean;
    isEmail?: boolean;
    minLength?: number;
}

export interface IAddressFormState {
    firstName: IConfigInputState;
    lastName: IConfigInputState;
    salutation: IConfigInputState;
    address1: IConfigInputState;
    address2: IConfigInputState;
    address3: IConfigInputState;
    zipCode: IConfigInputState;
    city: IConfigInputState;
    country: IConfigInputState;
    company: IConfigInputState;
    phone: IConfigInputState;
    [key: string]: IConfigInputState;
}

export interface IParamInputValidity {
    value: string | number | boolean;
    fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
    form: { [key: string]: IConfigInputState };
    fieldsConfig: { [key: string]: IConfigInputStable };
}
