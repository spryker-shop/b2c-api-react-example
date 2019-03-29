import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import * as navigationsActions from '@stores/actions/common/navigations';
import { IApiResponseData } from '@services/types';
import { IMainNavigationNode } from '@interfaces/navigations';
import api from '@services/api';

export class NavigationService extends ApiServiceAbstract {
    public static async getMainNavigation(dispatch: Function): Promise<void> {
        dispatch(navigationsActions.getMainNavigationPendingState());
        try {
            const response: IApiResponseData = await api.get('navigations/main_navigation');
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
