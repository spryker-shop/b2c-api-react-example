import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import {
    getOrdersCollectionFromStore,
    isOrderHistoryFulfilled,
    isOrderHistoryItems,
    isOrderHistoryInitiated
} from '@stores/reducers/pages/orderHistory/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IOrderItem } from '@interfaces/order';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isInitiated: boolean = isOrderHistoryInitiated(state, ownProps);
    const isFulfilled: boolean = isOrderHistoryFulfilled(state, ownProps);
    const isHasOrders: boolean = isOrderHistoryItems(state, ownProps);
    const orders: IOrderItem[] | null = getOrdersCollectionFromStore(state, ownProps);

    return {
        isFulfilled,
        isHasOrders,
        orders,
        isInitiated
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getOrdersCollectionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
