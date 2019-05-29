import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
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
import { IOrderItem } from '@interfaces/order';
import { ICustomerDataParsed } from '@interfaces/customer';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isPageCustomerProfileLoading(state, ownProps);
    const isRejected: boolean = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled: boolean = isPageCustomerProfileFulfilled(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isCustomerDataExist: boolean = isCustomerProfilePresent(state, ownProps);
    const customerReference: string = getCustomerReference(state, ownProps);
    const customerData: ICustomerDataParsed | null = getCustomerProfile(state, ownProps);
    const orders: IOrderItem[] | null = getOrdersCollectionFromStore(state, ownProps);
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
    getOrdersCollectionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
