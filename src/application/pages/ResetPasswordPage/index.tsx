import * as React from 'react';
import qs from 'query-string';
import { connect } from './connect';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { MainContainer } from '@components/MainContainer';
import { IResetPasswordPageProps as Props, IResetPasswordPageState as State } from './types';
import { InputChangeEvent } from '@interfaces/common';
import { ICustomerProfilePassword, IResetPasswordPayload } from '@interfaces/customer';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { styles } from './styles';
import { createPasswordConfigInputStable as inputsConfig } from '@constants/authentication';
import { checkFormInputValidity, checkFormValidity, formDataTransformer } from '@helpers/forms';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationWarning } from '@constants/notifications';

@connect
class ResetPasswordPageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        fields: {
            password: {
                value: '',
                isError: false
            },
            confirmPassword: {
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

    protected handleSubmitForm = (): void => {
        const { fields } = this.state;
        const passwordsPayload: ICustomerProfilePassword | {} = formDataTransformer(fields);
        const restorePasswordKey: string = qs.parse(this.props.location.search).token as string;

        if (fields.password.value !== fields.confirmPassword.value) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return;
        }

        const payload: IResetPasswordPayload = {
            password: (passwordsPayload as ICustomerProfilePassword).password,
            confirmPassword: (passwordsPayload as ICustomerProfilePassword).confirmPassword,
            restorePasswordKey
        };

        this.props.resetPasswordAction(payload);
    };

    public render(): JSX.Element {
        const { classes, isLoading } = this.props;
        const { fields, isFormValid } = this.state;

        return (
            <MainContainer classes={ { layout: classes.layout, wrapper: classes.wrapper } }>
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
                                        inputName={ inputsConfig.password.inputName }
                                        onChangeHandler={ this.handleInputChange }
                                        inputValue={ fields.password.value }
                                        isError={ fields.password.isError }
                                        inputType="password"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <SprykerInput
                                        isRequired
                                        label={ <FormattedMessage id={ 'confirm.password.title' } /> }
                                        inputName={ inputsConfig.confirmPassword.inputName }
                                        onChangeHandler={ this.handleInputChange }
                                        inputValue={ fields.confirmPassword.value }
                                        isError={ fields.confirmPassword.isError }
                                        inputType="password"
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button
                                        disabled={ isLoading || !isFormValid }
                                        variant="contained"
                                        onClick={ this.handleSubmitForm }
                                        fullWidth
                                    >
                                        <FormattedMessage id={ 'word.submit.title' } />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </MainContainer>
        );
    }
}

export const ResetPasswordPage = withStyles(styles)(ResetPasswordPageComponent);
