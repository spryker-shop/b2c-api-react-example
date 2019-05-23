import { IErrorItem, IResponseError } from '@services/types';
import { create } from 'apisauce';
const config = require('@configs/env_config');

export const api = create({
    baseURL: config.API_URL,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
});

export const setAuthToken = (userAuth: string) => api.setHeader('Authorization', 'Bearer ' + userAuth);
export const removeAuthToken = () => api.deleteHeader('Authorization');

export class ApiServiceAbstract {
    protected static getParsedAPIError = (response: IResponseError) => {
        let errorMessage: string;
        if (!response || !response.problem) {
            errorMessage = 'Sorry, we have an unexpected server error';
        } else {
            errorMessage = response.problem;
        }

        if (
            response.data &&
            response.data.errors &&
            Array.isArray(response.data.errors) &&
            response.data.errors.length
        ) {
            errorMessage = response.data.errors.reduce((accumulator: string, currentValue: IErrorItem) => (
                accumulator + ' ' + currentValue.detail
            ), '');
        }

        return errorMessage;
    };
}
