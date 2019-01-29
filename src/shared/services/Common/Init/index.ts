import api, { nodeApi } from 'src/shared/services/api';
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
} from '@stores/actions/Common/init';
import { parseStoreResponse } from 'src/shared/helpers/init/store';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from 'src/shared/services/types';
import { ICategory } from 'src/shared/interfaces/category';
import { IInitData } from 'src/shared/interfaces/init/index';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';

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
                    type: 'error'
                });
            }

        } catch (error) {
            dispatch(initApplicationDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: 'error'
            });
        }
    }

    public static async getCategoriesTree(dispatch: Function): Promise<void> {
        try {
            dispatch(categoriesPendingState());
            const response: IApiResponseData = await api.get('category-trees', {}, { withCredentials: true });

            if (response.ok) {
                let tree: Array<ICategory> = response.data.data[ 0 ].attributes.categoryNodesStorage;

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
                    type: 'error'
                });
            }

        } catch (error) {
            dispatch(categoriesRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: 'error'
            });
        }
    }

    public static async switchLocale(dispatch: Function, payload?: ILocaleActionPayload): Promise<void> {
        dispatch(switchLocalePendingState());
        try {
            await this.getCategoriesTree(dispatch);

            dispatch(switchLocaleFulfilledState(payload));

        } catch (error) {
            dispatch(switchLocaleRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'change.language.error.message',
                message: error.message,
                type: 'error'
            });
        }
    }
}
