import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from '@application/hoc/Reduxify';
import { getRouterHistoryPush } from '@helpers/router';

import { IAddressItem } from '@interfaces/addresses';

import {
    getAddressesAction,
    setCurrentAddressAction,
    deleteAddressAction,
} from '@stores/actions/pages/addresses';
import {
    getAddressesCollection,
    getCurrentAddress,
    isAddressesInitiated,
    isPageAddressesStateLoading
} from '@stores/reducers/pages/addresses/selectors';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerPush: Function = getRouterHistoryPush(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);
    const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const isAddressesInit: boolean = isAddressesInitiated(state, ownProps);

    return ({
        customer,
        currentAddress,
        addresses,
        routerPush,
        isLoading,
        isAddressesInit,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        getAddressesAction,
        setCurrentAddressAction,
        deleteAddressAction,
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
