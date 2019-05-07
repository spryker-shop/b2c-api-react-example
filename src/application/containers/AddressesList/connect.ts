import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAddressesAction, setCurrentAddressAction, deleteAddressAction, } from '@stores/actions/pages/addresses';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getAddressesCollection, isPageAddressesStateLoading } from '@stores/reducers/pages/addresses/selectors';
import { IAddressItem } from '@interfaces/addresses';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customer: string | null = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
    const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);

    return ({
        customer,
        addresses,
        isLoading
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        getAddressesAction,
        setCurrentAddressAction,
        deleteAddressAction,
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
