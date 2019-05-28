import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { AppMain } from '@components/AppMain';
import { IResetPasswordPageProps as Props, IResetPasswordPageState as State } from './types';
import { InputChangeEvent } from '@interfaces/common';
import { IResetPasswordPayload } from '@interfaces/customer';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { styles } from './styles';

@connect
class ResetPasswordPageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        password: '',
        confirmPassword: '',
        submitted: false
    };

    protected handleChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    protected submitRequest = (): void => {
        this.setState({ submitted: true });
        if (this.state.password !== this.state.confirmPassword) {
            return;
        }

        const payload: IResetPasswordPayload = {
            restorePasswordKey: this.props.restoreKey,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.resetPasswordAction(payload);
    };

    public render(): JSX.Element {
        const { classes, isLoading } = this.props;
        const { confirmPassword, password, submitted } = this.state;

        return (
            <AppMain classes={ { layout: classes.layout, wrapper: classes.wrapper } }>
                <Grid container justify="center">
                    <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 6 } className={ classes.box }>
                        <Typography variant="h2" component="h2" className={ classes.title }>
                            <FormattedMessage id={ 'reset.password.title' } />
                        </Typography>
                        <form noValidate autoComplete="off">
                            <Grid container direction="column" spacing={ 24 }>
                                <Grid item xs={ 12 }>
                                    <SprykerInput
                                        isRequired
                                        label={ <FormattedMessage id={ 'new.password.label' } /> }
                                        inputName="password"
                                        onChangeHandler={ this.handleChange }
                                        inputValue={ password }
                                        inputType="password"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <SprykerInput
                                        isRequired
                                        isError={ submitted && password !== confirmPassword }
                                        label={ <FormattedMessage id={ 'confirm.password.title' } /> }
                                        inputName="confirmPassword"
                                        onChangeHandler={ this.handleChange }
                                        inputValue={ confirmPassword }
                                        inputType="password"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button
                                        disabled={ isLoading }
                                        variant="contained"
                                        onClick={ this.submitRequest }
                                        fullWidth
                                    >
                                        <FormattedMessage id={ 'word.submit.title' } />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const ResetPasswordPage = withStyles(styles)(ResetPasswordPageComponent);
