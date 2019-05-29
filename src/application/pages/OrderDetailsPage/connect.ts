import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/common';
import {
    getOrderDetailsFromStore,
    isOrderDetailsFulfilled,
    isOrderDetailsInitiated,
    isOrderDetailsLoading,
    isOrderDetailsPresent,
    isOrderDetailsStateRejected,
} from '@stores/reducers/pages/orderDetails/selectors';
import { isAppInitialized } from '@stores/reducers/common/init/selectors';
import { getOrderDetailsAction } from '@stores/actions/pages/order';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IOrderDetailsParsed } from '@interfaces/order';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isOrderDetailsLoading(state, ownProps);
    const isRejected: boolean = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled: boolean = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated: boolean = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet: boolean = isAppInitialized(state, ownProps);
    const isOrderExist: boolean = isOrderDetailsPresent(state, ownProps);
    const order: IOrderDetailsParsed = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam: string | null = getRouterMatchParam(state, ownProps, 'orderId');

    return {
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isInitiated,
        isOrderExist,
        orderIdParam,
        order
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getOrderDetailsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
