import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAddressesAction, setCurrentAddressAction, deleteAddressAction } from '@stores/actions/pages/addresses';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    getAddressesCollection,
    isAddressesInitiated,
    isPageAddressesStateLoading
} from '@stores/reducers/pages/addresses/selectors';
import { IAddressItem } from '@interfaces/addresses';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customer: string | null = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);
    const isInitiated: boolean = isAddressesInitiated(state, ownProps);

    return ({
        customer,
        addresses,
        isLoading,
        isInitiated
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        getAddressesAction,
        setCurrentAddressAction,
        deleteAddressAction
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
