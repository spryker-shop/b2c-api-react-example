import { reduxify } from '@application/hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/router';
import {
    getOrderDetailsFromStore,
    isOrderDetailsFulfilled,
    isOrderDetailsInitiated,
    isOrderDetailsLoading,
    isOrderDetailsPresent,
    isOrderDetailsStateRejected,
} from '@stores/reducers/pages/orderDetails';
import { isAppInitiated } from '@stores/reducers/common/init/selectors';
import { getOrderDetailsAction } from '@stores/actions/pages/order';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TOrderId } from '@interfaces/order';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isOrderDetailsLoading(state, ownProps);
    const isRejected = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isOrderExist = isOrderDetailsPresent(state, ownProps);
    const order = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isInitiated,
        isOrderExist,
        orderIdParam,
        order
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
