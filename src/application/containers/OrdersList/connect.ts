import { reduxify } from '@hoc/Reduxify';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import {
    getOrdersCollectionFromStore,
    isOrderHistoryFulfilled,
    isOrderHistoryItems,
    isOrderHistoryInitiated
} from '@stores/reducers/pages/orderHistory';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isInitiated = isOrderHistoryInitiated(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    const isHasOrders = isOrderHistoryItems(state, ownProps);
    const orders = getOrdersCollectionFromStore(state, ownProps);

    return ({
        isFulfilled,
        isHasOrders,
        orders,
        isInitiated
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
