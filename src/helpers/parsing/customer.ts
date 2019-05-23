import { ICustomerDataParsed } from '@interfaces/customer';
import { ICustomerRawResponse } from '@services/pages/CustomerProfile/types';

export const parseCustomerDataResponse = (response: ICustomerRawResponse): ICustomerDataParsed | null => {
    if (!response) {
        return null;
    }

    const { data: { attributes, id } } = response;

    return { ...attributes, id };
};
