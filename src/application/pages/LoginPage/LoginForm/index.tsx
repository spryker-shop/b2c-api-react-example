import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    withStyles,
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import { ILoginFormProps as Props, ILoginFormState as State } from './types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

export class LoginFormBase extends React.Component<Props, State> {
    public readonly state: State = {
        username: '',
        password: '',
        isSubmitting: false,
        isSubmitted: false
    };

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (!this.state.username || !this.state.password) {
            return null;
        }
        const {username, password} = this.state;
        const payload = {
            username,
            password
        };
        this.props.handleSubmit(payload);
    };

    protected handleChange = (name: string) => (event: InputChangeEvent) => {
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
    };

    public render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant="title" color="inherit" noWrap>
                    <FormattedMessage id={'word.login.title'} />
                </Typography>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}
                      id="LoginForm">
                    <TextField
                        required
                        id="login-email"
                        label={<FormattedMessage id={'email.label'} />}
                        name="username"
                        onChange={this.handleChange('username')}
                        type="email"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            className: classes.input
                        }}
                    />

                    <TextField
                        required
                        id="login-password"
                        label={<FormattedMessage id={'word.password.title'} />}
                        name="password"
                        onChange={this.handleChange('password')}
                        type="password"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            className: classes.input
                        }}
                    />

                    <Button type="submit" variant="contained" className={classes.button}>
                        <FormattedMessage id={'word.login.title'} />
                    </Button>

                </form>
            </React.Fragment>
        );
    }
}

export const LoginForm = withStyles(styles)(LoginFormBase);
