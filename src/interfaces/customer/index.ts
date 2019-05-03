import { TAccessToken, TExpiresInAccessToken, TRefreshToken, TTokenType } from '@interfaces/login';
import { TRouterMatchParam } from '@helpers/router/types';

export type TSalutationVariant = {
  value: string,
  name: React.ReactNode,
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
    accessToken: TAccessToken;
    expiresIn: TExpiresInAccessToken;
    refreshToken: TRefreshToken;
    tokenType: TTokenType;
    customerRef: string;
}

export interface IResetPasswordPayload {
    restorePasswordKey: TRouterMatchParam;
    password: string;
    confirmPassword: string;
}
