export type TSalutationVariant = {
  value: string,
  name: JSX.Element
};

export interface ICustomerProfileIdentity {
    salutation?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender?: string | null;
}

export interface ICustomerProfilePassword {
    newPassword?: string;
    password: string;
    confirmPassword: string;
}

export interface ICustomerProfile extends ICustomerProfileIdentity, ICustomerProfilePassword {
    acceptedTerms?: boolean;
    [key: string]: string | number | boolean;
}

export interface ICustomerDataParsed extends ICustomerProfileIdentity {
    id: string;
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string | null;
    [propName: string]: string | number | null;
}

export interface ICustomerLoginData {
    password: string;
    username: string;
}

export interface ILoginDataToLocalStorage {
    email: string | null;
}

export interface ICustomerLoginDataParsed {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
    customerRef?: string;
}

export interface IResetPasswordPayload {
    restorePasswordKey: string | null;
    password: string;
    confirmPassword: string;
}
