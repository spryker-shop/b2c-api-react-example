import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { IForgotPasswordPageProps as Props, IForgotPasswordPageState as State } from './types';
import { MainContainer } from '@components/MainContainer';
import { styles } from './styles';
import { InputChangeEvent } from '@interfaces/common';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { pathLoginPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { emailConfigInputStable as inputsConfig } from '@constants/authentication';

@connect
class ForgotPasswordPageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        fields: {
            email: {
                value: '',
                isError: false
            }
        },
        isFormValid: false
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        if (prevState.fields !== this.state.fields) {
            this.handleFormValidity();
        }

        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                fields: {
                    email: {
                        value: '',
                        isError: false
                    }
                }
            });
        }
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

    protected submitRequest = (): void =>  this.props.forgotPasswordAction(this.state.fields.email.value);

    protected handleFormValidity = (): void => {
        const isFormValid = checkFormValidity({
            form: this.state.fields,
            fieldsConfig: inputsConfig
        });

        this.setState({ isFormValid });
    };

    public render(): JSX.Element {
        const { classes, isLoading } = this.props;
        const { fields, isFormValid } = this.state;

        return (
            <MainContainer classes={ { layout: classes.layout, wrapper: classes.wrapper } }>
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
                                        inputName={ inputsConfig.email.inputName }
                                        onChangeHandler={ this.handleInputChange }
                                        inputType="email"
                                        inputValue={ fields.email.value }
                                        isError={ fields.email.isError }
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Grid container spacing={ 24 }>
                                        <Grid item xs={ 12 } sm={ 6 }>
                                            <Button
                                                disabled={ isLoading }
                                                variant="outlined"
                                                fullWidth
                                                component={
                                                    ({ innerRef, ...props }) =>
                                                        <NavLink { ...props } to={ pathLoginPage } />
                                                }
                                            >
                                                <FormattedMessage id={ 'word.back.title' } />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 6 }>
                                            <Button
                                                disabled={ isLoading || !isFormValid }
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
            </MainContainer>
        );
    }
}

export const ForgotPasswordPage = withStyles(styles)(ForgotPasswordPageComponent);
