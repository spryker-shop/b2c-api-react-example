import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { shipmentCarrierNameToIconTransformer } from '@helpers/shimpent';
import { IShipmentMethodsGrouped, IShipmentMethodLabelData } from '@interfaces/checkout';
import { IShipmentMethodProps as Props } from './types';
import { ShipmentForm } from './ShipmentForm';
import { styles } from './styles';

const ShipmentMethodsComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, shipmentMethod, shipmentMethods, mutateShipmentMethodAction } = props;
    const isShipmentMethodsExist = Array.isArray(shipmentMethods) && shipmentMethods.length > 0;

    if (!isShipmentMethodsExist) {
        return null;
    }

    const shipmentCarrierNameToIcon: IShipmentMethodLabelData = shipmentCarrierNameToIconTransformer(shipmentMethods);

    const shipmentMethodsGrouped: IShipmentMethodsGrouped = {};
    shipmentMethods.forEach(item => {
        if (!shipmentMethodsGrouped[item.carrierName]) {
            shipmentMethodsGrouped[item.carrierName] = [];
        }

        shipmentMethodsGrouped[item.carrierName].push(item);
    });

    const shipmentMethodsForms: JSX.Element[] = Object.keys(shipmentMethodsGrouped).map(key =>
        <ShipmentForm
            key={ key }
            formName={ key }
            labelForm={ shipmentCarrierNameToIcon[key] }
            collections={ shipmentMethodsGrouped[key] }
            currentMode={ shipmentMethod }
            onChangeHandler={ mutateShipmentMethodAction }
            classes={{ form: classes.formItem }}
        />
    );

    return (
        <>
            { shipmentMethodsForms }
        </>
    );
};

export const ShipmentMethods = connect(withStyles(styles)(ShipmentMethodsComponent));
