import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Button, Grid } from '@material-ui/core';
import { SprykerInput } from '@application/components/UI/SprykerInput';
import { ILoginFormProps as Props, ILoginFormState as State } from './types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

export class LoginFormComponent extends React.Component<Props, State> {
    public readonly state: State = {
        username: '',
        password: '',
        isSubmitting: false,
        isSubmitted: false
    };

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const { username, password } = this.state;
        if (Boolean(username) || Boolean(password)) {
            return null;
        }
        const payload = { username, password };
        this.props.handleSubmit(payload);
    };

    protected handleChange = () => (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    public render() {
        const { classes } = this.props;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.handleSubmit }
                  id="LoginForm" className={ classes.wrapper }>
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
                        <Button fullWidth type="submit" variant="contained">
                            <FormattedMessage id={ 'word.login.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export const LoginForm = withStyles(styles)(LoginFormComponent);
