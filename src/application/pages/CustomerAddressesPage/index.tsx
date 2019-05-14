import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ICustomerAddressPageProps as Props } from './types';
import { pathAddressFormNew } from '@constants/routes';
import { AddressesList } from '@containers/AddressesList';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';
import { ErrorBoundary } from '@hoc/ErrorBoundary';

const CustomerAddressesPageComponent: React.SFC<Props> = (props): JSX.Element => {
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
                    <FormattedMessage id={ 'add.address.title' } />
                </Button>
            </div>
            <ErrorBoundary>
                <AddressesList />
            </ErrorBoundary>
        </>
    );
};

export const CustomerAddressesPage = withStyles(styles)(CustomerAddressesPageComponent);
