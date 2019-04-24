import { reduxify } from '@hoc/Reduxify';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import {
    getOrdersCollectionFromStore,
    isOrderHistoryFulfilled,
    isOrderHistoryInitiated,
    isOrderHistoryItems,
    isOrderHistoryLoading,
    isOrderHistoryStateRejected,
} from '@stores/reducers/pages/orderHistory';
import { isAppInitiated } from '@stores/reducers/common/init/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isOrderHistoryLoading(state, ownProps);
    const isRejected: boolean = isOrderHistoryStateRejected(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    const isInitiated = isOrderHistoryInitiated(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isHasOrders = isOrderHistoryItems(state, ownProps);
    const orders = getOrdersCollectionFromStore(state, ownProps);

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isUserLoggedIn,
        isInitiated,
        isHasOrders,
        orders,
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
