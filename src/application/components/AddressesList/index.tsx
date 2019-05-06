import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IAddressesListProps as Props } from './types';
import { IAddressItem } from '@interfaces/addresses';
import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { DeleteIcon, EditIcon } from './icons';
import { pathAddressFormUpdateBase } from '@constants/routes';
import { Preloader } from '@components/Preloader';
import { styles } from './styles';

@(withRouter as Function)
@connect
class AddressesListComponent extends React.Component<Props> {
    public static defaultProps = {
        isMainOnly: false,
        isEditOnly: false
    };

    public componentDidMount = (): void => {
        this.props.setCurrentAddressAction(null);

        this.initRequestData();
    };

    protected initRequestData = (): void => {
        const {addresses, customer} = this.props;

        if (!Boolean(addresses.length) && customer) {
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

        return (
            <Grid item key={ data.id || data.zipCode } xs={ 12 } md={ 6 }>
                <div className={ classes.addressContainer }>
                    <Typography component="h3" variant="h3" className={ classes.title }>
                        <FormattedMessage id={ addressTitle } />
                    </Typography>
                    <div>{`${ data.salutation } ${ data.firstName } ${ data.lastName }`}</div>
                    <div>{`${ data.company || '' }`}</div>
                    <div>{`${ data.address1 } ${ data.address2 } ${ data.address3 }`}</div>
                    <div>{`${ data.zipCode } ${ data.city }, ${ data.country }`}</div>
                    <div>{`${ data.phone || '' }`}</div>
                    <div className={ classes.actions }>
                        <IconButton
                            className={ `${ classes.actionItem } ${ classes.actionEdit }` }
                            onClick={ this.updatedAddressHandler(data.id) }
                            disabled={ isLoading }
                        >
                            <EditIcon />
                        </IconButton>

                        { !isEditOnly &&
                            <IconButton
                                className={ `${ classes.actionItem } ${ classes.actionDelete }` }
                                onClick={ () => deleteAddressAction(data.id, customer) }
                                disabled={ isLoading }
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    </div>
                </div>
            </Grid>
        );
    };

    public render = (): JSX.Element => {
        const { addresses, isMainOnly } = this.props;

        if (!Boolean(addresses.length)) {
            return <Preloader isStatic />;
        }

        return (
            <Grid container spacing={ 32 }>
                { addresses.filter((item: IAddressItem) => item.isDefaultShipping)
                    .map((item: IAddressItem) => this.renderAddressItem(item, 'shipping')) }
                { addresses.filter((item: IAddressItem) => item.isDefaultBilling)
                    .map((item: IAddressItem) => this.renderAddressItem(item, 'billing')) }
                { !isMainOnly &&
                    <>
                        { addresses.filter((item: IAddressItem) => !item.isDefaultShipping && !item.isDefaultBilling)
                            .map((item: IAddressItem) => this.renderAddressItem(item)) }
                    </>
                }
            </Grid>
        );
    };
}

export const AddressesList = withStyles(styles)(AddressesListComponent);
