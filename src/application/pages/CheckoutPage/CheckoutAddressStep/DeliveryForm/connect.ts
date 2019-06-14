import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import { IDeliverySelectionState } from '@interfaces/checkout';
import {
    mutateStateNewAddressDeliveryAction,
    mutateStateDeliverySelectionAddNewAction,
    mutateStateDeliverySelectionAddressIdAction,
    mutateDeliveryStepAction
} from '@stores/actions/pages/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;

    return {
        isUserLoggedIn,
        addressesCollection,
        deliveryNewAddress,
        deliverySelection
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    mutateStateNewAddressDeliveryAction,
    mutateStateDeliverySelectionAddNewAction,
    mutateStateDeliverySelectionAddressIdAction,
    mutateDeliveryStepAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
