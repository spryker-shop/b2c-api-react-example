import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ICustomerAddressPageProps as Props } from './types';
import { pathAddressFormNew } from '@constants/routes';
import { AddressesList } from '@components/AddressesList';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';

const CustomerAddressesPageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <>
            <div className={classes.heading}>
                <Typography component="h2" variant="h2">
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

            <AddressesList />
        </>
    );
};

export const CustomerAddressesPage = withStyles(styles)(CustomerAddressesPageComponent);
