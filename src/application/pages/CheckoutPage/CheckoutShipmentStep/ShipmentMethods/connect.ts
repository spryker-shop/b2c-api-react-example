import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getShipmentMethodsFromStore } from '@stores/reducers/pages/checkout/selectors';
import { IShipmentMethod } from '@interfaces/checkout';
import { mutateShipmentMethodAction } from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const shipmentMethods: IShipmentMethod[] = getShipmentMethodsFromStore(state, ownProps);
    const shipmentMethod: string = state.pageCheckout.shipmentMethod;

    return {
        shipmentMethod,
        shipmentMethods
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    mutateShipmentMethodAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
