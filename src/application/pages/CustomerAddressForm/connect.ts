import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';

import { getRouterHistoryBack, getRouterMatchParam } from '@helpers/router';
import { ICountry } from '@interfaces/country';
import { IAddressItem } from '@interfaces/addresses';

import { addAddressAction, updateAddressAction, getOneAddressAction } from '@stores/actions/pages/addresses';
import { getCounties, isAppInitiated } from '@stores/reducers/common/init/selectors';
import { getCustomerReference } from '@stores/reducers/pages/login';
import {
    getCurrentAddress,
    isAddressesStateRejected,
    isCurrentAddressPresent,
    isPageAddressesStateLoading
} from '@stores/reducers/pages/addresses/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const countries: ICountry[] = getCounties(state, ownProps);
    const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const addressIdParam = getRouterMatchParam(state, ownProps, 'addressId');
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isAddressExist = isCurrentAddressPresent(state, ownProps);
    const isRejected = isAddressesStateRejected(state, ownProps);

    return ({
        customer,
        currentAddress,
        countries,
        routerGoBack,
        isLoading,
        addressIdParam,
        isAppDataSet,
        isAddressExist,
        isRejected
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        addAddress: (payload: IAddressItem, customerId: string) => addAddressAction(payload, customerId),
        updateAddress: (addressId: string,
                        customerId: string,
                        payload: IAddressItem) => updateAddressAction(addressId, customerId, payload),
        getOneAddress: (customerId: string, addressId: string) => getOneAddressAction(customerId, addressId),
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
