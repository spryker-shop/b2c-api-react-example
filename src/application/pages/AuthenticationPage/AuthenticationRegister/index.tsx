import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { pathCustomerOverview } from '@constants/routes';
import { salutationVariants } from '@constants/customer';
import { typeNotificationWarning } from '@constants/notifications';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { IAuthenticationRegisterProps as Props, IAuthenticationRegisterState as State } from './types';
import { InputChangeEvent, FormEvent } from '@interfaces/common';
import { SprykerInput } from '@components/UI/SprykerInput';
import { SprykerSelect } from '@components/UI/SprykerSelect';
import { SprykerCheckbox } from '@components/UI/SprykerCheckbox';
import { registerConfigInputStable as inputsConfig } from '@constants/authentication';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { IFormInputIndexSignature } from '@interfaces/forms';
import { ICustomerProfile } from '@interfaces/customer';
import { initialState } from './settings';

@(withRouter as Function)
@connect
export class AuthenticationRegister extends React.Component<Props, State> {
    public readonly state: State = { ...initialState };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const { isAuth, getCustomerCartsAction, history, isCartLoading } = this.props;
        const isParallelRequest = isDevServer ? prevProps.isCartLoading && !isCartLoading : true;

        if (!prevProps.isAuth && isAuth) {
            getCustomerCartsAction();
            this.setState({ isCartLoading: true });
        }

        if (isAuth && isParallelRequest) {
            history.push(pathCustomerOverview);
        }

        if (prevState.fields !== this.state.fields) {
            this.handleFormValidity();
        }
    };

    protected handleInputChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: inputsConfig[name] });
        const isCheckboxes = value === inputsConfig.acceptedTerms.inputName;

        this.setState((prevState: State) => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                [name]: {
                    value: isCheckboxes ? !prevState.fields[name].value : value.trim(),
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
        const { customerRegisterAction } = this.props;
        const { fields } = this.state;
        const payload: ICustomerProfile | {} = Object.keys(fields)
            .reduce((accumulator: IFormInputIndexSignature, name: string) => {
                accumulator[name] = fields[name].value;

                return accumulator;
            }, {});

        if (fields.password.value !== fields.confirmPassword.value) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return;
        }

        customerRegisterAction(payload);
    };

    public render(): JSX.Element {
        const { isLoading } = this.props;
        const { isCartLoading, isFormValid, fields } = this.state;
        const isButtonDisabled = isLoading || isCartLoading || !isFormValid;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.handleSubmitForm } id="RegisterForm">
                <Grid container direction="column" spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <SprykerSelect
                            currentMode={ fields.salutation.value }
                            onChangeHandler={ this.handleInputChange }
                            menuItems={ salutationVariants }
                            label={ <FormattedMessage id={ 'salutation.label' } /> }
                            menuItemFirst={{
                                value: ' ',
                                name: <FormattedMessage id={ 'salutation.label' } />,
                                disabled: true
                            }}
                            name={ inputsConfig.salutation.inputName }
                            isFullWidth
                            isSimple
                            isRequired
                            isError={ fields.salutation.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'first.name.label' } /> }
                            inputName={ inputsConfig.firstName.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.firstName.value }
                            isError={ fields.firstName.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'last.name.label' } /> }
                            inputName={ inputsConfig.lastName.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.lastName.value }
                            isError={ fields.lastName.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'email.label' } /> }
                            inputName={ inputsConfig.email.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.email.value }
                            inputType="email"
                            isError={ fields.email.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'word.password.title' } /> }
                            inputName={ inputsConfig.password.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.password.value }
                            inputType="password"
                            isError={ fields.password.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'confirm.password.title' } /> }
                            inputName={ inputsConfig.confirmPassword.inputName }
                            onChangeHandler={ this.handleInputChange }
                            inputValue={ fields.confirmPassword.value }
                            inputType="password"
                            isError={ fields.confirmPassword.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerCheckbox
                            isChecked={ Boolean(fields.acceptedTerms.value) }
                            changeHandler={ this.handleInputChange }
                            label={  <FormattedMessage id={ 'accept.terms.title' } /> }
                            inputName={ inputsConfig.acceptedTerms.inputName }
                            isError={ fields.acceptedTerms.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button
                            disabled={ isButtonDisabled }
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            <FormattedMessage id={ 'sign.up.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
