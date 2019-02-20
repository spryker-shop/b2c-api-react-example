import * as React from 'react';
import { resetPasswordAction } from '@stores/actions/pages/login';
import {
    withStyles,
    Grid,
    Paper,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import {
    IResetPasswordPageProps as Props,
    IResetPasswordPageState as State
} from './types';
import { ClickEvent, InputChangeEvent } from '@interfaces/common';
import { IResetPasswordPayload } from '@interfaces/customer';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';

export class ResetPasswordPageBase extends React.Component<Props, State> {
    public readonly state: State = {
        password: '',
        confirmPassword: '',
        submitted: false
    };

    protected handleChange = (event: InputChangeEvent): void => {
        const {name, value} = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    protected submitRequest = (e: ClickEvent): void => {
        this.setState({submitted: true});
        if (this.state.password !== this.state.confirmPassword) {
            return;
        }

        const payload: IResetPasswordPayload = {
            restorePasswordKey: this.props.restoreKey,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.dispatch(resetPasswordAction(payload));
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const {confirmPassword, password, submitted} = this.state;

        return (
            <AppMain>
                <Grid
                    item xs={12}
                    container
                    justify="center"
                >
                    <Paper className={classes.forgot}>
                        <Typography variant="headline" paragraph>
                            <FormattedMessage id={'reset.password.title'} />
                        </Typography>
                        <div><FormattedMessage id={'enter.new.password.message'} /></div>
                        <form noValidate autoComplete="off">

                            <TextField
                                required
                                type="password"
                                label={<FormattedMessage id={'word.password.title'} />}
                                name="password"
                                value={password}
                                helperText={<FormattedMessage id={'word.password.title'} />}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.placeholder,
                                        filled: password.length > 0 ? classes.filled : null
                                    }
                                }}
                                margin="normal"
                                onChange={this.handleChange}
                                className={classes.textField}
                            />
                            <TextField
                                required
                                type="password"
                                error={submitted && password !== confirmPassword}
                                label={<FormattedMessage id={'confirm.password.title'} />}
                                name="confirmPassword"
                                value={confirmPassword}
                                helperText={<FormattedMessage id={'confirm.password.title'} />}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.placeholder,
                                        filled: confirmPassword.length > 0 ? classes.filled : null
                                    }
                                }}
                                margin="normal"
                                onChange={this.handleChange}
                                className={classes.textField}
                            />

                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submitRequest}
                        >
                            <FormattedMessage id={'word.submit.title'} />
                        </Button>
                    </Paper>
                </Grid>
            </AppMain>
        );
    }
}

export const ResetPasswordPage = withStyles(styles)(ResetPasswordPageBase);
