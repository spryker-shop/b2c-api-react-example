import * as React from 'react';
import { connect } from './connect';
import { ICheckoutSummaryAddressesProps as Props } from './types';
import { Grid, withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { AddressDetails } from '@components/AddressDetails';
import { IAddressItem } from '@interfaces/addresses';
import { styles } from './styles';

const CheckoutSummaryAddressesComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    const getAddressesInformation = (isBilling = false): IAddressItem => {
        const {
            addressesCollection,
            deliverySelection: { isAddNew: isAddNewDelivery, selectedAddressId },
            billingSelection: { selectedAddressId: billingId, isSameAsDelivery },
            deliveryNewAddress,
            billingNewAddress
        } = props;

        if (Boolean(selectedAddressId) && !isBilling || isSameAsDelivery && isBilling && Boolean(selectedAddressId)) {
            const delveryAddress = {...addressesCollection.filter(address => address.id === selectedAddressId)[0]};
            const contryName = delveryAddress.country.name;

            return { ...delveryAddress, country: contryName };
        }

        if (Boolean(billingId) && isBilling) {
            const billingAddress = {...addressesCollection.filter(address => address.id === billingId)[0]};
            const contryName = billingAddress.country.name;

            return { ...billingAddress, country: contryName };
        }

        if (isAddNewDelivery && !isBilling || isSameAsDelivery && isBilling && isAddNewDelivery) {
            const delveryAddress: {[index: string]: string | number | boolean;} = {};
            Object.keys(deliveryNewAddress).forEach(key => { delveryAddress[key] = deliveryNewAddress[key].value; });

            return delveryAddress;
        }

        const billingAddress: {[index: string]: string | number | boolean;} = {};
        Object.keys(billingNewAddress).forEach(key => { billingAddress[key] = billingNewAddress[key].value; });

        return billingAddress;
    };

    return (
        <Grid container spacing={ 16 }>
            <Grid item xs={ 12 } sm={ 6 }>
                <AddressDetails
                    address={ getAddressesInformation() }
                    title={<FormattedMessage id={ 'shipping.address.title' } />}
                    classes={{
                        container: classes.container,
                        title: classes.title
                    }}
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
                <AddressDetails
                    address={ getAddressesInformation(true) }
                    title={<FormattedMessage id={ 'billing.address.title' } />}
                    classes={{
                        container: classes.container,
                        title: classes.title
                    }}
                />
            </Grid>
        </Grid>
    );
};

export const CheckoutSummaryAddresses = connect(withStyles(styles)(CheckoutSummaryAddressesComponent));
