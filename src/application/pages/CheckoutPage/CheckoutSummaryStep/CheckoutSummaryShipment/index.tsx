import * as React from 'react';
import { connect } from './connect';
import { ICheckoutSummaryShipmentProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { Price } from '@components/Price';
import { IShipmentMethodLabelData } from '@interfaces/checkout';
import { shipmentCarrierNameToIconTransformer } from '@helpers/shimpent';

const CheckoutSummaryShipmentComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, shipmentMethod, shipmentMethods } = props;
    const isShipmentMethodsExist = Array.isArray(shipmentMethods) && shipmentMethods.length > 0;

    if (!isShipmentMethodsExist) {
        return null;
    }

    const shipmentCarrierNameToIcon: IShipmentMethodLabelData = shipmentCarrierNameToIconTransformer(shipmentMethods);

    const getShipmentMethod = () => shipmentMethods.filter((item: {[key: string]: string | number}) =>
        item.id === shipmentMethod)[0];
    const { name, price, carrierName } = getShipmentMethod();
    const shipmentHeading = shipmentCarrierNameToIcon[carrierName];

    return (
        <div className={ classes.container }>
            <div className={ classes.row }>
                <span className={ classes.title }>{ shipmentHeading.name }</span>
                { shipmentHeading.icon && <span className={ classes.icon }>{ shipmentHeading.icon }</span> }
            </div>
            <div>
                {`${name}: `} <Price value={ price } classes={{ price: classes.price }} />
            </div>
        </div>
    );
};

export const CheckoutSummaryShipment = connect(withStyles(styles)(CheckoutSummaryShipmentComponent));
