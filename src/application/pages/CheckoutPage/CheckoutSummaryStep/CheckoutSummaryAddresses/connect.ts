import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection, ICountry } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';
import { IBillingSelectionState, IDeliverySelectionState } from '@interfaces/checkout';
import { getCounties } from '@stores/reducers/common/init/selectors';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const addressesCollection: IAddressItemCollection[] = getAddressesCollectionFromCheckoutStore(state, ownProps);
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const deliverySelection: IDeliverySelectionState = state.pageCheckout.deliverySelection;
    const billingNewAddress: IAddressFormState = state.pageCheckout.billingNewAddress;
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
