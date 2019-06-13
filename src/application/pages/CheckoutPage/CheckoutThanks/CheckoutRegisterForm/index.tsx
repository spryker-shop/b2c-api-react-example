import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from './connect';
import { pathCustomerOverview } from '@constants/routes';
import { typeNotificationWarning } from '@constants/notifications';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { ICheckoutRegisterFormProps as Props, ICheckoutRegisterFormState as State, IAddressPayload } from './types';
import { InputChangeEvent, FormEvent } from '@interfaces/common';
import { SprykerInput } from '@components/UI/SprykerInput';
import { IAddressItem } from '@interfaces/addresses';
import { checkFormInputValidity, checkFormValidity, formDataTransformer } from '@helpers/forms';
import { createPasswordConfigInputStable as inputsConfig } from '@constants/authentication';
import { ICustomerProfile, ICustomerProfilePassword } from '@interfaces/customer';

@(withRouter as Function)
@connect
export class CheckoutRegisterForm extends React.Component<Props, State> {
    public readonly state: State = {
        fields: {
            password: {
                value: '',
                isError: false
            },
            confirmPassword: {
                value: '',
                isError: false
            }
        },
        isCartLoading: false,
        isFormValid: false
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

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const {
            isUserLoggedIn,
            getCustomerCartsAction,
            isCartLoading,
            history,
            isMultipleAddressesLoading
        } = this.props;
        const isAddressRequest = prevProps.isMultipleAddressesLoading && !isMultipleAddressesLoading;

        if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
            getCustomerCartsAction(null, isUserLoggedIn, true);
            this.setState({ isCartLoading: true });
        }

        if (isUserLoggedIn && prevProps.isCartLoading && !isCartLoading) {
            this.addingAddress();
        }

        if (isAddressRequest) {
            history.push(pathCustomerOverview);
        }

        if (prevState.fields !== this.state.fields) {
            this.handleFormValidity();
        }
    };

    protected addingAddress = (): void => {
        const {
            customer,
            addMultipleAddressAction,
            billingSelection: { isSameAsDelivery },
            deliveryNewAddress,
            billingNewAddress
        } = this.props;

        const addressDelivery = {
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
        addMultipleAddressAction(deliveryPayload, customer, billingPayload);
    };

    protected handleInputChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: inputsConfig[name] });

        this.setState((prevState: State) => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                [name]: {
                    value: value.trim(),
                    isError: !isInputValid
                }
            }
        }));
    };

    protected handleFormValidity = (): void => {
        const isFormValid = checkFormValidity({
            form: this.state.fields,
            fieldsConfig: inputsConfig
        });

        this.setState({ isFormValid });
    };

    protected handleSubmitForm = (event: FormEvent): void => {
        event.preventDefault();
        const { fields } = this.state;
        const { deliveryNewAddress, customerRegisterAction } = this.props;
        const passwordsPayload: ICustomerProfilePassword | {} = formDataTransformer(fields);

        if (fields.password.value !== fields.confirmPassword.value) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return;
        }

        const payload: ICustomerProfile = {
            password: (passwordsPayload as ICustomerProfilePassword).password,
            confirmPassword: (passwordsPayload as ICustomerProfilePassword).confirmPassword,
            salutation: deliveryNewAddress.salutation.value.toString(),
            firstName: deliveryNewAddress.firstName.value.toString(),
            lastName: deliveryNewAddress.lastName.value.toString(),
            email: deliveryNewAddress.email.value.toString(),
            acceptedTerms: true
        };

        customerRegisterAction(payload);
    };

    public render(): JSX.Element {
        const { isLoading } = this.props;
        const { isCartLoading, fields, isFormValid } = this.state;
        const isButtonDisabled = isLoading || isCartLoading || !isFormValid;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.handleSubmitForm } id="CheckoutRegisterForm">
                <Grid container direction="column" spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'create.password.title' } /> }
                            inputName={ inputsConfig.password.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.password.value }
                            isError={ fields.password.isError }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'verify.password.title' } /> }
                            inputName={ inputsConfig.confirmPassword.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.confirmPassword.value }
                            isError={ fields.confirmPassword.isError }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button disabled={ isButtonDisabled } type="submit" variant="contained" fullWidth>
                            <FormattedMessage id={ 'create.account.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
