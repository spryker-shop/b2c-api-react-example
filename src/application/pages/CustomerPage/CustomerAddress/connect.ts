import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/common';
import { IAddressItem } from '@interfaces/addresses';
import { addAddressAction, updateAddressAction, getOneAddressAction } from '@stores/actions/pages/addresses';
import { getCustomerReference } from '@stores/reducers/pages/login/selectors';
import {
    getCurrentAddress,
    isCurrentAddressPresent,
    isPageAddressesStateLoading
} from '@stores/reducers/pages/addresses/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
    const customer: string = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const addressIdParam: string = getRouterMatchParam(state, ownProps, 'addressId');
    const isAddressExist: boolean = isCurrentAddressPresent(state, ownProps);

    return {
        customer,
        currentAddress,
        isLoading,
        addressIdParam,
        isAddressExist
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addAddressAction,
    updateAddressAction,
    getOneAddressAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
