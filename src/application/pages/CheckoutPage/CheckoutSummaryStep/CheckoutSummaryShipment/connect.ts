import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getShipmentMethodsFromStore } from '@stores/reducers/pages/checkout/selectors';
import { IShipmentMethod } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const shipmentMethods: IShipmentMethod[] = getShipmentMethodsFromStore(state, ownProps);
    const shipmentMethod: string = state.pageCheckout.shipmentMethod;

    return {
        shipmentMethods,
        shipmentMethod
    };
};

export const connect = reduxify(mapStateToProps);
