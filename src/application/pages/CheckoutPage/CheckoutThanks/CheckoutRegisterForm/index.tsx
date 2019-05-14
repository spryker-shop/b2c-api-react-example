import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { pathCustomerOverviewPage } from '@constants/routes';
import { typeNotificationWarning } from '@constants/notifications';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { ICheckoutRegisterFormProps as Props, ICheckoutRegisterFormState as State, IAddressPayload } from './types';
import { InputChangeEvent, FormEvent } from '@interfaces/common';
import { SprykerInput } from '@components/UI/SprykerInput';
import { IAddressItem } from '@interfaces/addresses';

@(withRouter as Function)
@connect
export class CheckoutRegisterForm extends React.Component<Props, State> {
    public state: State = {
        password: '',
        confirmPassword: '',
        isCartLoading: false
    };

    protected transformAddressData = (addressPayload: IAddressPayload): IAddressItem => {
        const payload: IAddressItem = {};

        Object.keys(addressPayload.address).forEach(fieldName => {
            if (fieldName === 'country') {
                payload.iso2Code = addressPayload.address[fieldName].value;

                return;
            }

            payload[fieldName] = addressPayload.address[fieldName].value;
        });

        return {
            ...payload,
            isDefaultShipping:
            addressPayload.isDefaultShipping,
            isDefaultBilling: addressPayload.isDefaultBilling
        };
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const { isAuth, getCustomerCart, isCartLoading, isAddressLoading, history } = this.props;
        const isParallelCartRequest = isDevServer ? prevProps.isCartLoading && !isCartLoading : true;
        const isParallelAddressRequest = isDevServer ? prevProps.isAddressLoading && !isAddressLoading : true;

        if (!prevProps.isAuth && isAuth) {
            getCustomerCart();
            this.setState({ isCartLoading: true });
        }

        if (isAuth && isParallelCartRequest) {
            this.addingAddress();
        }

        if (isAuth && isParallelAddressRequest) {
            history.push(pathCustomerOverviewPage);
        }
    };

    protected addingAddress = () => {
        const {
            customer,
            addAddress,
            billingSelection: { isSameAsDelivery },
            deliveryNewAddress,
            billingNewAddress
        } = this.props;

        const addressDelivery =  {
            address: deliveryNewAddress,
            isDefaultShipping: true,
            isDefaultBilling: isSameAsDelivery
        };
        const addressBilling = {
            address: billingNewAddress,
            isDefaultShipping: false,
            isDefaultBilling: true
        };
        const deliveryPayload = this.transformAddressData(addressDelivery);
        const billingPayload = !isSameAsDelivery ? this.transformAddressData(addressBilling) : null;
        addAddress(deliveryPayload, customer, billingPayload);
    };

    protected handleChange = ({ target: { name, value } }: InputChangeEvent): void => {
        this.setState(() => ({ ...this.state, [name]: value }));
    };

    protected handleSubmitForm = (e: FormEvent): void => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;
        const { deliveryNewAddress, handleSubmitRegisterForm } = this.props;

        if (password !== confirmPassword) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return null;
        }

        const payload = {
            salutation: deliveryNewAddress.salutation.value,
            firstName: deliveryNewAddress.firstName.value,
            lastName: deliveryNewAddress.lastName.value,
            email: deliveryNewAddress.email.value,
            acceptedTerms: true,
            password,
            confirmPassword,
        };

        handleSubmitRegisterForm(payload);
    };

    public render(): JSX.Element {
        const { isLoading } = this.props;
        const { isCartLoading } = this.state;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.handleSubmitForm } id="CheckoutRegisterForm">
                <Grid container direction="column" spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'create.password.title' } /> }
                            inputName="password"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.password }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'verify.password.title' } /> }
                            inputName="confirmPassword"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.confirmPassword }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button disabled={ isLoading || isCartLoading } type="submit" variant="contained" fullWidth>
                            <FormattedMessage id={ 'create.account.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
