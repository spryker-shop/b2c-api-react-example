import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import {
    mutateStateNewAddressBillingAction,
    mutateStateBillingSelectionAddNewAction,
    mutateStateBillingSelectionAddressIdAction,
    mutateStateBillingSelectionSameAsDeliveryAction,
    mutateBillingStepAction
} from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingSelectionState } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const billingNewAddress: IAddressFormState = state.pageCheckout.billingNewAddress;
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;

    return {
        isUserLoggedIn,
        addressesCollection,
        billingNewAddress,
        billingSelection
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    mutateStateNewAddressBillingAction,
    mutateStateBillingSelectionAddNewAction,
    mutateStateBillingSelectionAddressIdAction,
    mutateStateBillingSelectionSameAsDeliveryAction,
    mutateBillingStepAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
