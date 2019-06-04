import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    getCustomerProfile,
    isCustomerProfilePresent,
    isPageCustomerProfileFulfilled,
    isPageCustomerProfileLoading,
    isPageCustomerProfileRejected
} from '@stores/reducers/pages/customerProfile/selectors';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerReference } from '@stores/reducers/pages/login/selectors';
import { isAppInitialized } from '@stores/reducers/common/init/selectors';
import { getOrdersCollectionFromStore, isOrderHistoryItems } from '@stores/reducers/pages/orderHistory/selectors';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import { getAddressesCollection, isAddressesInitiated } from '@stores/reducers/pages/addresses/selectors';
import { IAddressItem } from '@interfaces/addresses';
import { IOrderItem } from '@interfaces/order';
import { ICustomerDataParsed } from '@interfaces/customer';
import { logoutAction } from '@stores/actions/pages/login';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isPageCustomerProfileLoading(state, ownProps);
    const isRejected: boolean = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled: boolean = isPageCustomerProfileFulfilled(state, ownProps);
    const isAppDataSet: boolean = isAppInitialized(state, ownProps);
    const isCustomerDataExist: boolean = isCustomerProfilePresent(state, ownProps);
    const customerReference: string = getCustomerReference(state, ownProps);
    const customerData: ICustomerDataParsed = getCustomerProfile(state, ownProps);
    const orders: IOrderItem[] = getOrdersCollectionFromStore(state, ownProps);
    const isAddressesListInitiated: boolean = isAddressesInitiated(state, ownProps);
    const isHasOrders: boolean = isOrderHistoryItems(state, ownProps);
    const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);

    return {
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isCustomerDataExist,
        customerReference,
        customerData,
        orders,
        isAddressesListInitiated,
        isHasOrders,
        addresses
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getCustomerProfileAction,
    getOrdersCollectionAction,
    logoutAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
