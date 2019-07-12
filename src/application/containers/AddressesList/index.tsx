import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IAddressesListProps as Props } from './types';
import { IAddressItem } from '@interfaces/addresses';
import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { DeleteIcon, EditIcon } from './icons';
import { pathAddressFormUpdateBase } from '@constants/routes';
import { Preloader } from '@components/Preloader';
import { styles } from './styles';
import { AddressDetails } from '@components/AddressDetails';

@(withRouter as Function)
@connect
class AddressesListComponent extends React.Component<Props> {
    addressesLimit: number = 2;

    public static defaultProps = {
        isMainOnly: false,
        isEditOnly: false
    };

    public componentDidMount = (): void => {
        this.props.setCurrentAddressAction(null);

        this.initRequestData();
    };

    protected initRequestData = (): void => {
        const { isInitiated, customer } = this.props;

        if (!isInitiated && customer) {
            this.props.getAddressesAction(customer);
        }
    };

    protected updatedAddressHandler = (addressId: string) => (): void => {
        const { setCurrentAddressAction, history } = this.props;

        setCurrentAddressAction(addressId);
        history.push(`${ pathAddressFormUpdateBase }/${ addressId }`);
    };

    protected renderAddressItem = (data: IAddressItem, type = ''): JSX.Element => {
        const {
            classes,
            isLoading,
            customer,
            deleteAddressAction,
            isEditOnly
        } = this.props;
        const mainAddressTitle = type === 'shipping' ? 'shipping.address.title' : 'billing.address.title';
        const addressTitle = type ? mainAddressTitle : 'word.address.title';
        this.addressesLimit -= 1;

        return (
            <Grid item key={ data.id } xs={ 12 } lg={ 6 } className={ classes.col }>
                <AddressDetails
                    address={ data }
                    title={ <FormattedMessage id={ addressTitle } /> }
                    classes={{ container: classes.addressContainer }}
                >
                    <div className={ classes.actions }>
                        <IconButton
                            className={ `${ classes.actionItem } ${ classes.actionEdit }` }
                            onClick={ this.updatedAddressHandler(data.id) }
                            disabled={ isLoading }
                            classes={{ disabled: classes.actionItemDisabled }}
                        >
                            <EditIcon />
                        </IconButton>

                        { !isEditOnly &&
                            <IconButton
                                className={ `${ classes.actionItem } ${ classes.actionDelete }` }
                                onClick={ () => deleteAddressAction(data.id, customer) }
                                disabled={ isLoading }
                                classes={{ disabled: classes.actionItemDisabled }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    </div>
                </AddressDetails>
            </Grid>
        );
    };

    protected sortArray = (key: string) => (object1: IAddressItem, object2: IAddressItem) => {
        if ( object1[key] < object2[key] ) {
            return 1;
        }
        if ( object1[key] > object2[key] ) {
            return -1;
        }

        return 0;
    };

    protected renderAddresses = (addresses: IAddressItem[]) => addresses.map((item: IAddressItem, index: number) => {
        const { isMainOnly } = this.props;
        const shouldShowAddress = isMainOnly ? index < 2 : true;

        if (item.isDefaultShipping) {
            return this.renderAddressItem(item, 'shipping');
        }

        if (item.isDefaultBilling) {
            return this.renderAddressItem(item, 'billing');
        }

        if (shouldShowAddress) {
            return this.renderAddressItem(item);
        }
    });

    public render = (): JSX.Element => {
        const { addresses, isLoading, classes } = this.props;
        const sortedArray = addresses.sort(this.sortArray('isDefaultBilling'))
            .sort(this.sortArray('isDefaultShipping'));

        if (isLoading) {
            return <Preloader isStatic />;
        }

        return (
            <>
                { Boolean(addresses.length)
                    ? (
                        <Grid container className={ classes.container }>
                            { this.renderAddresses(sortedArray) }
                        </Grid>
                    )
                    : (
                        <Typography component="h3" variant="h3">
                            <FormattedMessage id={ 'empty.address.message' } />
                        </Typography>
                    )
                }
            </>
        );
    };
}

export const AddressesList = withStyles(styles)(AddressesListComponent);
