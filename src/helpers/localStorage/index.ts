import { ICustomerLoginDataParsed } from '@interfaces/customer';

export const saveAccessDataToLocalStorage = (payload: ICustomerLoginDataParsed): boolean => {
    if (!payload) {
        return false;
    }
    localStorage.setItem('tokenExpire', (Math.floor(Date.now() / 1000) + payload.expiresIn - 120).toString(10));
    localStorage.setItem('accessToken', payload.accessToken);
    localStorage.setItem('refreshToken', payload.refreshToken);
    localStorage.setItem('customerRef', payload.customerRef);

    return true;
};
