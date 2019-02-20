import * as React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { AddressDetails } from '@application/components/AddressDetails';
import { IOrderAddressesProps } from './types';
import { styles } from './styles';

export const OrderAddressesBase: React.SFC<IOrderAddressesProps> = (props): JSX.Element => {
    const {
        classes,
        billingAddress,
        shippingAddress,
        billingBlockTitle,
        shippingBlockTitle
    } = props;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <AddressDetails {...shippingAddress} blockTitle={shippingBlockTitle} />
                <AddressDetails {...billingAddress} blockTitle={billingBlockTitle} />
            </Grid>
        </Grid>
    );
};

export const OrderAddresses = withStyles(styles)(OrderAddressesBase);
