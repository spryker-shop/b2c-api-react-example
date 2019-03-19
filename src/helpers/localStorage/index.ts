import { ICustomerLoginDataParsed, ILoginDataToLocalStorage } from '@interfaces/customer';

export const saveAccessDataToLocalStorage = (payload: ICustomerLoginDataParsed): boolean => {
    if (!payload) {
        return false;
    }
    localStorage.setItem(
        'tokenExpire',
        (Math.floor(Date.now() / 1000) + payload.expiresIn - 120).toString(10),
    );
    localStorage.setItem('accessToken', payload.accessToken);
    localStorage.setItem('refreshToken', payload.refreshToken);
    localStorage.setItem('customerRef', payload.customerRef);

    return true;
};

// TODO: it's a temporary solution. We do not have email in the /customers/{customerReference}
export const saveCustomerUsernameToLocalStorage = (payload: ILoginDataToLocalStorage): boolean => {
    if (!payload) {
        return false;
    }
    const customerUsername = payload.email ? payload.email : null;
    localStorage.setItem('customerUsername', customerUsername);

    return true;
};
