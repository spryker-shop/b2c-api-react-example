import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { ICustomerAddressPageProps as Props, ICustomerAddressPageState as State } from './types';
import { ClickEvent } from '@interfaces/common';
import { pathAddressFormNew, pathAddressFormUpdateBase } from '@constants/routes';
import { CustomerPageTitle } from '@application/components/CustomerPageTitle';
import { SprykerButton } from '@application/components/UI/SprykerButton';
import { AddressesList } from './AddressesList';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class CustomerAddressBase extends React.Component<Props, State> {
    public state: State = {};

    public componentDidMount = (): void => {
        this.props.setCurrentAddressAction(null);

        this.initRequestData();
    }

    public handleAddAddress = () => {
        this.props.routerPush(pathAddressFormNew);
    };

    public setUpdatedAddress = (addressId: string) => (e: ClickEvent) => {
        this.props.setCurrentAddressAction(addressId);
        this.props.routerPush(`${pathAddressFormUpdateBase}/${addressId}`);
    };

    private initRequestData = () => {
        const {addresses, isLoading, customer} = this.props;
        if (isLoading) { return; }

        if ((addresses && Array.isArray(addresses) && !addresses.length) && customer) {
            this.props.getAddressesAction(customer);
        }
    };

    public render(): JSX.Element {
        const { classes, customer, addresses, isLoading, deleteAddressAction } = this.props;

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <CustomerPageTitle title={ <FormattedMessage id={ 'manage.addresses' } /> } />

                    { addresses.length ? null : <div className={ classes.emptyMsg }>
                        <FormattedMessage id={ 'empty.address.message' } />
                    </div> }
                </Grid>

                <Grid item xs={12}>
                    <AddressesList
                        isLoading={ isLoading }
                        customer={ customer }
                        customerAddresses={ addresses }
                        updatedAddressHandler={ this.setUpdatedAddress }
                        deleteAddressHandler={ deleteAddressAction }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 3 } className={ classes.addButton }>
                    <SprykerButton
                        title={ <FormattedMessage id={ 'add.address.title' } /> }
                        onClick={ this.handleAddAddress }
                        disabled={ isLoading }
                    />
                </Grid>
            </Grid>
        );
    }
}

export const CustomerAddressPage = withStyles(styles)(CustomerAddressBase);
