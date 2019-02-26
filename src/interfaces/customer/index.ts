import { TAccessToken, TExpiresInAccessToken, TRefreshToken, TTokenType } from '@interfaces/login';
import { TRouterMatchParam } from '@helpers/router/types';

export type TCustomerSalutation = string;
export type TCustomerFirstName = string;
export type TCustomerLastName = string;
export type TCustomerEmail = string;
export type TCustomerPassword = string;
export type TCustomerUsername = string;
export type TCustomerId = string;
export type TCustomerReference = string;
export type TCustomerTime = string;
export type TCustomerDateOfBirth = string;
export type TCustomerGender = string;
export type TAcceptedTerms = string;
export type TCustomerMiddleName = string;
export type TCustomerPoBox = string;
export type TCustomerPhone = string;
export type TCustomerCellPhone = string;

export type TCustomerInputValue = TCustomerFirstName
    | TCustomerLastName
    | TCustomerEmail
    | TCustomerPassword
    | TCustomerSalutation
    | TCustomerUsername;

export type TSalutationVariant = {
  value: string,
  label: React.ReactNode,
};

export interface ICustomerProfileIdentity {
    salutation?: TCustomerSalutation;
    firstName?: TCustomerFirstName;
    lastName?: TCustomerLastName;
    email: TCustomerEmail;
    gender?: TCustomerGender | null;
}

export interface ICustomerProfilePassword {
    newPassword?: TCustomerPassword;
    password: TCustomerPassword;
    confirmPassword: TCustomerPassword;
}

export interface ICustomerProfile extends ICustomerProfileIdentity, ICustomerProfilePassword {
    acceptedTerms?: boolean;

    [key: string]: string | number | boolean;
}

export interface ICustomerDataParsed extends ICustomerProfileIdentity {
    id: TCustomerId;
    createdAt: TCustomerTime;
    updatedAt: TCustomerTime;
    dateOfBirth: TCustomerDateOfBirth | null;

    [propName: string]: string | number | null;
}

export interface ICustomerLoginData {
    password: TCustomerPassword;
    username: TCustomerUsername;
}

export interface ILoginDataToLocalStorage {
    email: TCustomerUsername | TCustomerEmail | null;
}

export interface ICustomerLoginDataParsed {
    accessToken: TAccessToken;
    expiresIn: TExpiresInAccessToken;
    refreshToken: TRefreshToken;
    tokenType: TTokenType;
    customerRef: TCustomerReference;
}

export interface IResetPasswordPayload {
    restorePasswordKey: TRouterMatchParam;
    password: TCustomerPassword;
    confirmPassword: TCustomerPassword;
}
