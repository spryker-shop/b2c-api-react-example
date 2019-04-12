import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { pathCustomerPage } from '@constants/routes';
import { SalutationVariants } from '@constants/customer';
import { typeNotificationWarning } from '@constants/notifications';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { IRegisterFormProps as Props, IRegisterFormState as State } from './types';
import { InputChangeEvent, FormEvent } from '@interfaces/common';
import { SprykerInput } from '@application/components/UI/SprykerInput';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';
import { SprykerCheckbox } from '@application/components/UI/SprykerCheckbox';

@(withRouter as Function)
@connect
export class RegisterForm extends React.Component<Props, State> {
    public state: State = {
        salutation: ' ',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { isAuth, getCustomerCart, history } = this.props;

        if (!prevProps.isAuth && isAuth) {
            getCustomerCart();
            history.push(pathCustomerPage);
        }
    };

    protected handleChangeSalutation = (event: InputChangeEvent): void => {
        this.setState(() => ({ salutation: event.target.value }));
    };

    protected handleChangeAgreement = (event: InputChangeEvent): void => {
        this.setState(() => ({ acceptedTerms: !this.state.acceptedTerms }));
    };

    protected handleChange = ({ target: { name, value } }: InputChangeEvent): void => {
        this.setState(() => ({ ...this.state, [name]: value }));
    };

    protected handleSubmitForm = (e: FormEvent): void => {
        e.preventDefault();
        const { salutation, firstName, lastName, email, password, confirmPassword, acceptedTerms } = this.state;

        if (!salutation || !firstName || !lastName || !email || !password || !confirmPassword || !acceptedTerms) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return null;
        }

        if (password !== confirmPassword) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return null;
        }

        this.props.handleSubmitRegisterForm(this.state);
    };

    public render(): JSX.Element {
        const { isLoading } = this.props;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.handleSubmitForm } id="RegisterForm">
                <Grid container direction="column" spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <SprykerSelect
                            currentMode={ this.state.salutation }
                            onChangeHandler={ this.handleChangeSalutation }
                            menuItems={ SalutationVariants }
                            label={ <FormattedMessage id={ 'salutation.label' } /> }
                            menuItemFirst={{
                                value: ' ',
                                name: <FormattedMessage id={ 'salutation.label' } />,
                                disabled: true
                            }}
                            name="salutation"
                            isFullWidth
                            isSimple
                            isRequired
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'first.name.label' } /> }
                            inputName="firstName"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.firstName }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'last.name.label' } /> }
                            inputName="lastName"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.lastName }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'email.label' } /> }
                            inputName="email"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.email }
                            inputType="email"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'word.password.title' } /> }
                            inputName="password"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.password }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'confirm.password.title' } /> }
                            inputName="confirmPassword"
                            onChangeHandler={ this.handleChange }
                            inputValue={ this.state.confirmPassword }
                            inputType="password"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerCheckbox
                            isChecked={ this.state.acceptedTerms }
                            changeHandler={ this.handleChangeAgreement }
                            label={  <FormattedMessage id={ 'accept.terms.title' } /> }
                            name="acceptedTerms"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button disabled={ isLoading } type="submit" variant="contained" fullWidth>
                            <FormattedMessage id={ 'sign.up.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
