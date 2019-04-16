import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { PartnerIconHermes, PartnerIconDhl } from './icons';
import { IShipmentMethodsGrouped } from '@constants/checkout/types';
import { IShipmentMethodProps as Props } from './types';
import { ShipmentForm } from './ShipmentForm';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

const ShipmentMethodsComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, shipmentMethod, shipmentMethods, mutateShipmentMethod } = props;
    const isShipmentMethodsExist = Boolean(Array.isArray(shipmentMethods) && shipmentMethods.length > 0);

    if (!isShipmentMethodsExist) {
        return null;
    }

    const shipmentCarrierNameToIcon: {[key: string]: {}} = {
        'Spryker Dummy Shipment': {
            icon: <PartnerIconDhl />,
            name: <FormattedMessage id={ 'shipment.method.dhl.title' } />
        },
        'Spryker Drone Shipment': {
            icon: <PartnerIconHermes />,
            name: <FormattedMessage id={ 'shipment.method.hermes.title' } />
        }
    };

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
            onChangeHandler={ mutateShipmentMethod }
            classes={{ form: classes.formItem }}
        />
    );

    return (
        <div>
            { shipmentMethodsForms }
        </div>
    );
};

export const ShipmentMethods = connect(withStyles(styles)(ShipmentMethodsComponent));
