import * as React from 'react';
import { connect } from './connect';
import { ICheckoutSummaryShipmentProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';
import { PartnerIconHermes, PartnerIconDhl } from './icons';
import { AppPrice } from '@components/AppPrice';

const CheckoutSummaryShipmentComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, shipmentMethod, shipmentMethods } = props;

    const shipmentCarrierNameToIcon: {[key: string]: {name: JSX.Element, icon: JSX.Element}} = {
        'Spryker Dummy Shipment': {
            icon: <PartnerIconDhl />,
            name: <FormattedMessage id={ 'shipment.method.dhl.title' } />
        },
        'Spryker Drone Shipment': {
            icon: <PartnerIconHermes />,
            name: <FormattedMessage id={ 'shipment.method.hermes.title' } />
        }
    };

    const getShipmentMethod = () => shipmentMethods.filter((item: {[key: string]: string | number}) =>
        item.id === shipmentMethod)[0];
    const { name, price, carrierName } = getShipmentMethod();
    const shipmentHeading = shipmentCarrierNameToIcon[carrierName];

    return (
        <div className={ classes.container }>
            <div className={ classes.row }>
                <span className={ classes.title }>{ shipmentHeading.name }</span>
                <span className={ classes.icon }>{ shipmentHeading.icon }</span>
            </div>
            <div>
                {`${name}: `} <AppPrice value={ price } classes={{ price: classes.price }} />
            </div>
        </div>
    );
};

export const CheckoutSummaryShipment = connect(withStyles(styles)(CheckoutSummaryShipmentComponent));
