import * as navigationsActions from '@stores/actions/common/navigations';
import { api, ApiServiceAbstract } from '@services/api';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { TApiResponseData } from '@services/types';
import { IMainNavigationNode } from '@interfaces/navigations';

export class NavigationService extends ApiServiceAbstract {
    public static async getMainNavigation(dispatch: Function): Promise<void> {
        dispatch(navigationsActions.getMainNavigationPendingState());
        try {
            const response: TApiResponseData = await api.get('navigations/main_navigation');
            if (response.ok) {
                const nodesTree: IMainNavigationNode[] = response.data.data.attributes.nodes
                    .filter((item: IMainNavigationNode) => {
                        const isEmptyNode = Boolean(item.children.length) === false &&
                            Boolean(item.resourceId) === false;

                        if (!isEmptyNode) return item;
                    });
                dispatch(navigationsActions.getMainNavigationFulfilledState(nodesTree));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(navigationsActions.getMainNavigationRejectState(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(navigationsActions.getMainNavigationRejectState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
