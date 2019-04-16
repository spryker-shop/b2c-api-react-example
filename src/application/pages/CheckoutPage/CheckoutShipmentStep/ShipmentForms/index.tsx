import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { getShipmentMethodsFormSettings } from '@helpers/formCreations/checkout/shipmentSettings';
import { PartnerIconHermes, PartnerIconDhl } from './icons';
import { IShippingMethodsParams } from '@helpers/formCreations/checkout/types';
import { IShipmentMethodsGrouped } from '@constants/checkout/types';
import { checkoutFormsNames } from '@constants/checkout';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { IShipmentMethodProps } from './types';
import { styles } from './styles';

export const ShipmentFormsComponent: React.SFC<IShipmentMethodProps> = (props): JSX.Element => {
    const { classes, shipmentMethod, shipmentMethods } = props;
    const isShipmentMethodsExist = Boolean(Array.isArray(shipmentMethods) && shipmentMethods.length > 0);

    if (!isShipmentMethodsExist) {
        return null;
    }

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;
        const { mutateShipmentMethod } = props;

        mutateShipmentMethod(value);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    const shipmentCarrierNameToIcon: IShippingMethodsParams['shipmentCarrierNameToIcon'] = {
        'Spryker Dummy Shipment': <PartnerIconDhl />,
        'Spryker Drone Shipment': <PartnerIconHermes />
    };

    const shipmentMethodsGrouped: IShipmentMethodsGrouped = {};
    for (const shipmentMethod of shipmentMethods) {
        if (!shipmentMethodsGrouped[ shipmentMethod.carrierName ]) {
            shipmentMethodsGrouped[ shipmentMethod.carrierName ] = [];
        }
        shipmentMethodsGrouped[shipmentMethod.carrierName].push(shipmentMethod);
    }

    const shipmentMethodsForms: JSX.Element[] = [];
    for (const carrierName in shipmentMethodsGrouped) {
        const shipmentMethodsParams: IShippingMethodsParams = {
            shipmentMethods: shipmentMethodsGrouped[ carrierName ],
            currentValueShipmentMethod: shipmentMethod,
            carrierName,
            shipmentCarrierNameToIcon,
            submitHandler: handleSubmit,
            inputChangeHandler: handleSelectionsChange
        };
        const shipmentMethodFormSettings = getShipmentMethodsFormSettings(
            `${checkoutFormsNames.shipmentMethodBase}${carrierName}`,
            shipmentMethodsParams
        );

        shipmentMethodsForms.push(<SprykerForm key={ carrierName } form={ shipmentMethodFormSettings } />);
    }

    return (
        <Grid container>
            <Grid item xs={ 12 } className={ classes.shipmentMethodsParentForms }>
                { shipmentMethodsForms }
            </Grid>
        </Grid>
    );
};

export const ShipmentForms = connect(withStyles(styles)(ShipmentFormsComponent));
