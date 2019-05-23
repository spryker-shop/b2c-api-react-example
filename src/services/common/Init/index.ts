import { api, ApiServiceAbstract } from '@services/api';
import * as initActions from '@stores/actions/common/init';
import { parseStoreResponse } from '@helpers/parsing';
import { TApiResponseData } from '@services/types';
import { ICategory } from '@interfaces/common';
import { IInitData } from '@interfaces/init';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { NavigationService } from '@services/common/Navigations';
import { getAnonymId } from '@helpers/common';

export class InitAppService extends ApiServiceAbstract {
    public static async getInitData(dispatch: Function): Promise<void> {
        const isTouch = 'ontouchstart' in window;
        dispatch(initActions.initApplicationDataPendingStateAction());

        try {
            const anonymId = getAnonymId();
            const response: TApiResponseData = await api.get('stores', null);

            if (response.ok) {
                const responseParsed: IInitData = parseStoreResponse(response.data);
                await NavigationService.getMainNavigation(dispatch);
                dispatch(initActions.initApplicationDataFulfilledStateAction({ ...responseParsed, isTouch }));
                dispatch(initActions.anonymIdFilFilled(anonymId));
                dispatch(initActions.getCategoriesAction());
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(initActions.initApplicationDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(initActions.initApplicationDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getCategoriesTree(dispatch: Function): Promise<void> {
        try {
            dispatch(initActions.categoriesPendingState());
            const response: TApiResponseData = await api.get('category-trees', {}, { withCredentials: true });

            if (response.ok) {
                let tree: ICategory[] = response.data.data[0].attributes.categoryNodesStorage;

                if (!Array.isArray(tree)) {
                    tree = [];
                }
                dispatch(initActions.categoriesFulfilledState(tree));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(initActions.categoriesRejectedState(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(initActions.categoriesRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async switchLocale(dispatch: Function, payload?: ILocaleActionPayload): Promise<void> {
        dispatch(initActions.switchLocalePendingState());
        try {
            api.setHeader('Accept-Language', payload.locale);
            localStorage.setItem('locale', payload.locale);

            await NavigationService.getMainNavigation(dispatch);
            await this.getCategoriesTree(dispatch);

            dispatch(initActions.switchLocaleFulfilledState(payload));

        } catch (error) {
            dispatch(initActions.switchLocaleRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'change.language.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
