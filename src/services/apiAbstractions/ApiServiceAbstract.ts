import { IErrorItem, IResponseError } from './types';

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
