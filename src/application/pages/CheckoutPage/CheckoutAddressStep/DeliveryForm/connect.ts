import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import { ICheckoutAddressState, IDeliverySelectionState, IFormFieldMutate } from '@interfaces/checkout';
import {
    mutateStateNewAddressDeliveryAction,
    mutateStateDeliverySelectionAddNewAction,
    mutateStateDeliverySelectionAddressIdAction,
    mutateDeliveryStepAction
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const deliveryNewAddress: ICheckoutAddressState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;

    return {
        isUserLoggedIn,
        addressesCollection,
        deliveryNewAddress,
        deliverySelection
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateNewAddressDelivery: (payload: IFormFieldMutate): void => {
        dispatch(mutateStateNewAddressDeliveryAction(payload));
    },
    mutateStateDeliverySelectionAddNew: (): void => {
        dispatch(mutateStateDeliverySelectionAddNewAction());
    },
    mutateStateDeliverySelectionAddressId: (payload: string): void => {
        dispatch(mutateStateDeliverySelectionAddressIdAction(payload));
    },
    mutateDeliveryStep: (payload: boolean): void => {
        dispatch(mutateDeliveryStepAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
