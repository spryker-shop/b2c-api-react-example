import { reduxify } from '@application/hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import {
    getAddressesCollectionFromCheckoutStore
} from '@stores/reducers/pages/checkout/selectors';
import { getCounties } from '@stores/reducers/common/init/selectors';
import {
    mutateStateNewAddressBillingAction,
    mutateStateBillingSelectionAddNewAction,
    mutateStateBillingSelectionAddressIdAction,
    mutateStateBillingSelectionSameAsDeliveryAction,
    mutateBillingStepAction,
} from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICountry } from '@interfaces/country';
import { IAddressItemCollection } from '@interfaces/addresses';
import {
    IBillingAddressState,
    IBillingSelectionState,
    IFormFieldMutate
} from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const billingNewAddress: IBillingAddressState = state.pageCheckout.billingNewAddress;
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
