import * as React from 'react';
import { connect } from './connect';
import { pathForgotPassword } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { SprykerInput } from '@components/UI/SprykerInput';
import { ILoginFormProps as Props, ILoginFormState as State } from './types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';
import { loginConfigInputStable as inputsConfig } from '@constants/authentication';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { ICustomerLoginData } from '@interfaces/customer';
import { IFormInputIndexSignature } from '@interfaces/forms';

@(withRouter as Function)
@connect
class LoginFormComponent extends React.Component<Props, State> {
    public readonly state: State = {
        fields: {
            username: {
                value: ' ',
                isError: false
            },
            password: {
                value: '',
                isError: false
            }
        },
        isCartLoading: false,
        isFormValid: false
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const { isAuth, getCustomerCartsAction, history, redirectAfterLoginPath, isCartLoading } = this.props;
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const isParallelRequest = isDevServer ? prevProps.isCartLoading && !isCartLoading : true;

        if (!prevProps.isAuth && isAuth) {
            getCustomerCartsAction();
            this.setState({ isCartLoading: true });
        }

        if (isAuth && isParallelRequest) {
            history.push(redirectAfterLoginPath);
        }

        if (prevState.fields !== this.state.fields) {
            this.handleFormValidity();
        }
    };

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const { fields } = this.state;
        const { loginCustomerAction } = this.props;
        const payload: ICustomerLoginData | {} = Object.keys(fields)
            .reduce((accumulator: IFormInputIndexSignature, name: string) => {
                accumulator[name] = fields[name].value;

                return accumulator;
            }, {});

        loginCustomerAction(payload);
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

    public render() {
        const { classes, isLoading } = this.props;
        const { isCartLoading, isFormValid, fields } = this.state;
        const isButtonDisabled = isLoading || isCartLoading || !isFormValid;

        return (
            <>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={ this.handleSubmit }
                    id="LoginForm"
                    className={ classes.wrapper }
                >
                    <Grid container direction="column" spacing={ 24 }>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'email.label' } /> }
                                inputName={ inputsConfig.username.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputType="email"
                                inputValue={ fields.username.value }
                                isError={ fields.username.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'word.password.title' } /> }
                                inputName={ inputsConfig.password.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputType="password"
                                inputValue={ fields.password.value }
                                isError={ fields.password.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button disabled={ isButtonDisabled } fullWidth type="submit" variant="contained">
                                <FormattedMessage id={ 'word.login.title' } />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography align="center" component="div" variant="h5" color="textSecondary">
                    <NavLink to={ pathForgotPassword } className={ classes.link }>
                        <FormattedMessage id={ 'forgot.password.title' } />
                    </NavLink>
                </Typography>
            </>
        );
    }
}

export const LoginForm = withStyles(styles)(LoginFormComponent);
