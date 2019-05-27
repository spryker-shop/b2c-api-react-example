import * as navigationsActions from '@stores/actions/common/navigations';
import { api, ApiServiceAbstract } from '@services/api';
import { TApiResponseData } from '@services/types';
import { IMainNavigationNode } from '@interfaces/navigations';
import { errorMessageInform } from '@helpers/common';

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
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(navigationsActions.getMainNavigationRejectState(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
