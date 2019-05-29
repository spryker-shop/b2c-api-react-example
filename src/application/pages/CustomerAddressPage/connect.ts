import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/common';
import { IAddressItem } from '@interfaces/addresses';
import { addAddressAction, updateAddressAction, getOneAddressAction } from '@stores/actions/pages/addresses';
import { getCustomerReference } from '@stores/reducers/pages/login';
import {
    getCurrentAddress,
    isCurrentAddressPresent,
    isPageAddressesStateLoading
} from '@stores/reducers/pages/addresses/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const addressIdParam = getRouterMatchParam(state, ownProps, 'addressId');
    const isAddressExist = isCurrentAddressPresent(state, ownProps);

    return ({
        customer,
        currentAddress,
        isLoading,
        addressIdParam,
        isAddressExist
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        addAddress: (payload: IAddressItem, customerId: string) => addAddressAction(payload, customerId),
        updateAddress: (addressId: string, customerId: string, payload: IAddressItem) =>
            updateAddressAction(addressId, customerId, payload),
        getOneAddress: (customerId: string, addressId: string) => getOneAddressAction(customerId, addressId),
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
