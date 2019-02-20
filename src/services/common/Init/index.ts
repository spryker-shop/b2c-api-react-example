import api, { nodeApi } from '@services/api';
import {
    categoriesFulfilledState,
    categoriesPendingState,
    categoriesRejectedState,
    IInitApplicationDataPayload,
    initApplicationDataFulfilledStateAction,
    initApplicationDataPendingStateAction,
    initApplicationDataRejectedStateAction,
    switchLocalePendingState,
    switchLocaleFulfilledState,
    switchLocaleRejectedState,
    getCategoriesAction
} from '@stores/actions/common/init';
import { parseStoreResponse } from '@helpers/init/store';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from '@services/types';
import { ICategory } from '@interfaces/category';
import { IInitData } from '@interfaces/init';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export class InitAppService extends ApiServiceAbstract {
    public static async getInitData(dispatch: Function, payload?: IInitApplicationDataPayload): Promise<void> {
        let anonymId: string;
        try {
            const nodeResponse: IApiResponseData = await nodeApi.get('getUniqueUser');

            if (nodeResponse.ok) {
                anonymId = nodeResponse.data;
            } else {
                anonymId = 'anonym';
            }

        } catch (err) {
            anonymId = 'anonym';
        }

        try {
            dispatch(initApplicationDataPendingStateAction());
            const response: IApiResponseData = await api.get('stores', null);

            if (response.ok) {
                const responseParsed: IInitData = parseStoreResponse(response.data);
                dispatch(initApplicationDataFulfilledStateAction({ ...responseParsed, anonymId }));
                dispatch(getCategoriesAction());
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(initApplicationDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(initApplicationDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getCategoriesTree(dispatch: Function): Promise<void> {
        try {
            dispatch(categoriesPendingState());
            const response: IApiResponseData = await api.get('category-trees', {}, { withCredentials: true });

            if (response.ok) {
                let tree: ICategory[] = response.data.data[ 0 ].attributes.categoryNodesStorage;

                if (!Array.isArray(tree)) {
                    tree = [];
                }
                dispatch(categoriesFulfilledState(tree));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(categoriesRejectedState(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(categoriesRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async switchLocale(dispatch: Function, payload?: ILocaleActionPayload): Promise<void> {
        dispatch(switchLocalePendingState());
        try {
            api.setHeader('Accept-Language', payload.locale);
            localStorage.setItem('locale', payload.locale);

            await this.getCategoriesTree(dispatch);

            dispatch(switchLocaleFulfilledState(payload));

        } catch (error) {
            dispatch(switchLocaleRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'change.language.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
