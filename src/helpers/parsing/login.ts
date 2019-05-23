import { ICustomerLoginDataParsed } from '@interfaces/customer';
import jwtDecoder from 'jwt-decode';
import { ICustomerLoginRawResponse } from '@services/pages/Login/types';

export const parseLoginDataResponse = (response: ICustomerLoginRawResponse): ICustomerLoginDataParsed => {
    if (!response) {
        return null;
    }

    const { data: { attributes } } = response;
    const { sub }: { sub: string } = jwtDecoder(attributes.accessToken);
    const customerRef = JSON.parse(sub).customer_reference;

    const result = {
        accessToken: attributes.accessToken,
        expiresIn: attributes.expiresIn,
        refreshToken: attributes.refreshToken,
        tokenType: attributes.tokenType,
        customerRef
    };

    return result;
};
