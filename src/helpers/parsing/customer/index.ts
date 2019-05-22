import { ICustomerDataParsed } from '@interfaces/customer';

interface ICustomerDataResponse {
    data: {
        attributes: ICustomerDataParsed;
        id: string;
    };
    included: object;
}

export const parseCustomerDataResponse = (response: ICustomerDataResponse): ICustomerDataParsed | null => {
    if (!response) {
        return null;
    }

    const {data: {attributes, id}}: ICustomerDataResponse = response;
    const result: ICustomerDataParsed = {...attributes, id};

    return result;
};
