import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { IForgotPasswordPageProps as Props, IForgotPasswordPageState as State } from './types';
import { AppMain } from '@components/AppMain';
import { styles } from './styles';
import { ClickEvent, InputChangeEvent } from '@interfaces/common';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';

@connect
export class ForgotPasswordPageBase extends React.Component<Props, State> {
    public readonly state: State = {
        email: ''
    };

    protected handleChange = (e: InputChangeEvent): void => {
        this.setState({ email: e.target.value });
    };

    protected submitRequest = (e: ClickEvent): void => {
        this.props.sendForgotRequest(this.state.email);
    };

    public render(): JSX.Element {
        const { classes, routerGoBack, isLoading } = this.props;
        const { email } = this.state;

        return (
            <AppMain classes={ { layout: classes.layout, wrapper: classes.wrapper } }>
                <Grid container justify="center">
                    <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 6 } className={ classes.box }>
                        <Typography variant="h2" component="h2">
                            <FormattedMessage id={ 'recovery.password.title' } />
                        </Typography>
                        <Typography variant="h5" paragraph>
                            <FormattedMessage id={ 'enter.email.address.message' } />
                        </Typography>
                        <form autoComplete="off">
                            <Grid container direction="column" spacing={ 24 }>
                                <Grid item xs={ 12 }>
                                    <SprykerInput
                                        isRequired
                                        label={ <FormattedMessage id={ 'email.label' } /> }
                                        inputName="email"
                                        onChangeHandler={ this.handleChange }
                                        inputValue={ email }
                                        inputType="email"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Grid container spacing={ 24 }>
                                        <Grid item xs={ 12 } sm={ 6 }>
                                            <Button
                                                disabled={ isLoading }
                                                variant="outlined"
                                                onClick={ () => routerGoBack() }
                                                fullWidth
                                            >
                                                <FormattedMessage id={ 'word.back.title' } />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 6 }>
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
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const ForgotPasswordPage = withStyles(styles)(ForgotPasswordPageBase);
