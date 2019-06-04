import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ICustomerAddressesProps as Props } from './types';
import { pathAddressFormNew } from '@constants/routes';
import { AddressesList } from '@containers/AddressesList';
import { Button, Hidden, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';
import { ErrorBoundary } from '@hoc/ErrorBoundary';

const CustomerAddressesComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <>
            <div className={ classes.heading }>
                <Typography component="h1" variant="h2" className={ classes.title }>
                    <FormattedMessage id={'word.addresses.title'} />
                </Typography>

                <Button
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathAddressFormNew } /> }
                    variant="outlined"
                    className={ classes.addButton }
                >
                    <Hidden only={['xs']} implementation="css">
                        <FormattedMessage id={ 'add.address.title' } />
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <FormattedMessage id={ 'word.add.title' } />
                    </Hidden>
                </Button>
            </div>
            <ErrorBoundary>
                <AddressesList />
            </ErrorBoundary>
        </>
    );
};

export const CustomerAddresses = withStyles(styles)(CustomerAddressesComponent);
