import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getShipmentMethodsFromStore } from '@stores/reducers/pages/checkout/selectors';
import { IShipmentMethod } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const shipmentMethods: IShipmentMethod[] | null = getShipmentMethodsFromStore(state, ownProps);
    const shipmentMethod: IShipmentMethod['id'] | null = state.pageCheckout.shipmentMethod;

    return {
        shipmentMethods,
        shipmentMethod
    };
};

export const connect = reduxify(mapStateToProps);
