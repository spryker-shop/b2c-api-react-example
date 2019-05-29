import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import {
    mutateStateNewAddressBillingAction,
    mutateStateBillingSelectionAddNewAction,
    mutateStateBillingSelectionAddressIdAction,
    mutateStateBillingSelectionSameAsDeliveryAction,
    mutateBillingStepAction,
} from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingSelectionState, IFormFieldMutate } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
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

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateNewAddressBilling: (payload: IFormFieldMutate): void => {
        dispatch(mutateStateNewAddressBillingAction(payload));
    },
    mutateStateBillingSelectionAddNew: (): void => {
        dispatch(mutateStateBillingSelectionAddNewAction());
    },
    mutateStateBillingSelectionAddressId: (payload: string): void => {
        dispatch(mutateStateBillingSelectionAddressIdAction(payload));
    },
    mutateStateBillingSelectionSameAsDelivery: (payload: boolean): void => {
        dispatch(mutateStateBillingSelectionSameAsDeliveryAction(payload));
    },
    mutateBillingStep: (payload: boolean): void => {
        dispatch(mutateBillingStepAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
