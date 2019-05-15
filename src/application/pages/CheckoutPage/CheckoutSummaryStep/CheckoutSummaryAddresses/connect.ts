import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import {
    IBillingAddressState,
    IBillingSelectionState,
    ICheckoutAddressState,
    IDeliverySelectionState
} from '@interfaces/checkout';
import { ICountry } from '@interfaces/country';
import { getCounties } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const deliveryNewAddress: ICheckoutAddressState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;
    const billingNewAddress: IBillingAddressState = state.pageCheckout.billingNewAddress;
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const countriesCollection: ICountry[] = getCounties(state, ownProps);

    return {
        addressesCollection,
        deliveryNewAddress,
        deliverySelection,
        billingNewAddress,
        billingSelection,
        countriesCollection
    };
};

export const connect = reduxify(mapStateToProps);
