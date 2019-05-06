import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IAddressesListProps as Props } from './types';
import { IAddressItem } from '@interfaces/addresses';
import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { DeleteIcon, EditIcon } from './icons';

const AddressesListComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        isLoading,
        customer,
        customerAddresses,
        updatedAddressHandler,
        deleteAddressHandler
    } = props;

    const renderAddressItem = (data: IAddressItem, type = ''): JSX.Element => {
        const mainAddressTitle = type === 'shipping' ? 'shipping.address.title' : 'billing.address.title';
        const addressTitle = type ? mainAddressTitle : 'word.address.title';

        return (
            <Grid item key={ data.id || data.zipCode } xs={ 12 } md={ 6 }>
                <div className={ classes.addressContainer }>
                    <Typography component="h3" variant="h3" className={ classes.title }>
                        <FormattedMessage id={ addressTitle } />
                    </Typography>
                    <div>{ `${ data.salutation } ${ data.firstName } ${ data.lastName }` }</div>
                    <div>{ `${ data.company || '' }` }</div>
                    <div>{ `${ data.address1 } ${ data.address2 } ${ data.address3 }` }</div>
                    <div>{ `${ data.zipCode } ${ data.city }, ${ data.country }` }</div>
                    <div>{ `${ data.phone || '' }` }</div>
                    <div className={ classes.actions }>
                        <IconButton
                            className={`${classes.actionItem} ${classes.actionEdit}`}
                            onClick={ updatedAddressHandler(data.id) }
                            disabled={ isLoading }
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            className={`${classes.actionItem} ${classes.actionDelete}`}
                            onClick={ () => deleteAddressHandler(data.id, customer) }
                            disabled={ isLoading }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        );
    };

    return (
        <Grid container spacing={ 32 }>
            { customerAddresses.filter((item: IAddressItem) => item.isDefaultShipping)
                .map((item: IAddressItem) => renderAddressItem(item, 'shipping')) }
            { customerAddresses.filter((item: IAddressItem) => item.isDefaultBilling)
                .map((item: IAddressItem) => renderAddressItem(item, 'billing')) }
            { customerAddresses.filter((item: IAddressItem) => !item.isDefaultShipping && !item.isDefaultBilling)
                .map((item: IAddressItem) => renderAddressItem(item)) }
        </Grid>
    );
};

export const AddressesList = withStyles(styles)(AddressesListComponent);
