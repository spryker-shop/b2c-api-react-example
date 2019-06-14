import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore } from '@stores/reducers/pages/checkout/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const addressesCollection: IAddressItemCollection[] =
        getAddressesCollectionFromCheckoutStore(state, ownProps);

    return {
        addressesCollection
    };
};

export const connect = reduxify(mapStateToProps);
