import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterHistoryPush } from '@helpers/router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

import {
    getCustomerProfile,
    isCustomerProfilePresent,
    isPageCustomerProfileFulfilled,
    isPageCustomerProfileLoading,
    isPageCustomerProfileRejected
} from '@stores/reducers/pages/customerProfile';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { isAppInitiated } from '@stores/reducers/common/init/selectors';
import { getOrdersCollectionFromStore, isOrderHistoryItems } from '@stores/reducers/pages/orderHistory';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import { getAddressesCollection, isAddressesInitiated } from '@stores/reducers/pages/addresses/selectors';
import { IAddressItem } from '@interfaces/addresses';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isPageCustomerProfileLoading(state, ownProps);
    const isRejected = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled = isPageCustomerProfileFulfilled(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isCustomerDataExist = isCustomerProfilePresent(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);
    const routerPush = getRouterHistoryPush(state, ownProps);
    const customerData = getCustomerProfile(state, ownProps);
    const orders = getOrdersCollectionFromStore(state, ownProps);
    const isAddressesListInitiated: boolean = isAddressesInitiated(state, ownProps);
    const isHasOrders = isOrderHistoryItems(state, ownProps);
    const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isCustomerDataExist,
        customerReference,
        routerPush,
        customerData,
        orders,
        isAddressesListInitiated,
        isHasOrders,
        addresses
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getCustomerData: (customerReference: string) => getCustomerProfileAction(customerReference),
            getOrdersCollectionAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
