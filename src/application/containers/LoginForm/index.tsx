import * as React from 'react';
import { connect } from './connect';
import { pathForgotPassword } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { SprykerInput } from '@application/components/UI/SprykerInput';
import { ILoginFormProps as Props, ILoginFormState as State } from './types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';

@(withRouter as Function)
@connect
export class LoginFormComponent extends React.Component<Props, State> {
    public readonly state: State = {
        username: '',
        password: ''
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { isAuth, getCustomerCart, history, redirectAfterLoginPath } = this.props;

        if (!prevProps.isAuth && isAuth) {
            getCustomerCart();
            history.push(redirectAfterLoginPath);
        }
    };

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const { username, password } = this.state;
        const { handleSubmitLoginForm, onSubmitHandler } = this.props;

        if (!Boolean(username) || !Boolean(password)) {
            return null;
        }

        const payload = { username, password };
        onSubmitHandler();
        handleSubmitLoginForm(payload);
    };

    protected handleChange = () => (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    public render() {
        const { classes, isLoading } = this.props;

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
                                inputName="username"
                                onChangeHandler={ this.handleChange() }
                                inputType="email"
                                inputValue={ this.state.username }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'word.password.title' } /> }
                                inputName="password"
                                onChangeHandler={ this.handleChange() }
                                inputType="password"
                                inputValue={ this.state.password }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button disabled={ isLoading } fullWidth type="submit" variant="contained">
                                <FormattedMessage id={ 'word.login.title' } />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography align="center" component="div" variant="headline" color="textSecondary">
                    <NavLink to={ pathForgotPassword } className={ classes.link }>
                        <FormattedMessage id={ 'forgot.password.title' } />
                    </NavLink>
                </Typography>
            </>
        );
    }
}

export const LoginForm = withStyles(styles)(LoginFormComponent);
