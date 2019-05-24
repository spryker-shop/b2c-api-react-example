import {
    refreshTokenPendingState,
    refreshTokenRejectedState,
    refreshTokenFulfilledState
} from '@stores/actions/pages/login';
import { api, ApiServiceAbstract } from '@services/api';
import { parseLoginDataResponse } from '@helpers/parsing';
import { saveAccessDataToLocalStorage } from '@helpers/localStorage';
import { TApiResponseData } from '@services/types';
import { ICustomerLoginDataParsed } from '@interfaces/customer';
import { errorMessageInform } from '@helpers/common';

export class RefreshTokenService extends ApiServiceAbstract {
    public static async getActualToken(dispatch: Function): Promise<string> {
        const accessToken: string = localStorage.getItem('accessToken');
        const tokenExpire: string = localStorage.getItem('tokenExpire');
        const refreshToken: string = localStorage.getItem('refreshToken');

        if (!accessToken || !tokenExpire || !refreshToken) {
            return Promise.reject('Not tokens.');
        }

        const now: number = Math.floor(Date.now() / 1000);

        if (now > Number(tokenExpire)) {
            try {
                const newToken = await RefreshTokenService.refreshTokenRequest(dispatch, refreshToken);

                return newToken;
            } catch (error) {
                dispatch(refreshTokenRejectedState(error.message));
                errorMessageInform(error.message, false);

                return Promise.reject(error.message);
            }
        }

        return accessToken;
    }

    public static async refreshTokenRequest(dispatch: Function, refreshToken: string): Promise<string> {
        const body = {
            data: {
                type: 'refresh-tokens',
                attributes: {
                    'refreshToken': refreshToken,
                    'refresh_token': refreshToken,
                },
            },
        };
        dispatch(refreshTokenPendingState());

        const response: TApiResponseData = await api.post('refresh-tokens', body, {withCredentials: true});

        if (response.ok) {
            const responseParsed: ICustomerLoginDataParsed = parseLoginDataResponse(response.data);
            saveAccessDataToLocalStorage(responseParsed);
            dispatch(refreshTokenFulfilledState(responseParsed));

            return responseParsed.accessToken;
        } else {
            const errorMessage = this.getParsedAPIError(response);
            dispatch(refreshTokenRejectedState(errorMessage));
            errorMessageInform(errorMessage);

            return Promise.reject(errorMessage);
        }
    }
}
