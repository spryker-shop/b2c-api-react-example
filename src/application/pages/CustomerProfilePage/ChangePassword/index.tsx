import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { IChangePasswordProps as Props, IChangePasswordState as State } from './types';
import { typeNotificationWarning } from '@constants/notifications';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import { changePasswordConfigInputStable } from '@constants/customer';
import { SprykerInput } from '@components/UI/SprykerInput';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

@connect
export class ChangePasswordComponent extends React.Component<Props, State> {
    readonly state: State = {
        fields: {
            password: {
                value: '',
                isError: false
            },
            newPassword: {
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

        if (this.props.isPasswordUpdated && !prevProps.isPasswordUpdated) {
            this.clearPasswords();
        }
    };

    protected handleInputChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const cleanValue = value.trim();
        const isInputValid = checkFormInputValidity({ value, fieldConfig: changePasswordConfigInputStable[name] });

        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [name]: {
                    value: cleanValue,
                    isError: !isInputValid
                }
            }
        });
    };

    protected handleFormValidity = (): void => {
        const isFormValid = checkFormValidity({
            form: this.state.fields,
            fieldsConfig: changePasswordConfigInputStable
        });

        this.setState({ isFormValid });
    };

    protected handleSubmitPassword = (): void => {
        const { password, newPassword, confirmPassword } = this.state.fields;

        if (newPassword.value !== confirmPassword.value) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return;
        }

        const passwordData = {
            password: password.value.toString(),
            newPassword: newPassword.value.toString(),
            confirmPassword: confirmPassword.value.toString()
        };

        this.props.updateCustomerPasswordAction(this.props.customerReference, passwordData);
    };

    protected clearPasswords = (): void => {
        this.setState({
            isFormValid: false,
            fields: {
                password: {
                    value: '',
                    isError: false
                },
                newPassword: {
                    value: '',
                    isError: false
                },
                confirmPassword: {
                    value: '',
                    isError: false
                }
            }
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        const { isFormValid, fields: { password, newPassword, confirmPassword } } = this.state;
        const {
            password: passwordConfig,
            newPassword: newPasswordConfig,
            confirmPassword: confirmPasswordConfig
        } = changePasswordConfigInputStable;

        return (
            <>
                <Typography component="h2" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ 'word.password.title' } />
                </Typography>

                <form id="passwordForm" name="passwordForm" className={ classes.form }>
                    <Grid container direction="column" spacing={ 24 }>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'password.label' } /> }
                                inputName={ passwordConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ password.value }
                                isError={ password.isError }
                                inputType="password"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'new.password.label' } /> }
                                inputName={ newPasswordConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ newPassword.value }
                                isError={ newPassword.isError }
                                inputType="password"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'confirm.password.label' } /> }
                                inputName={ confirmPasswordConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ confirmPassword.value }
                                isError={ confirmPassword.isError }
                                inputType="password"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button
                                disabled={ !isFormValid }
                                variant="contained"
                                onClick={ this.handleSubmitPassword }
                                className={ classes.submit }
                            >
                                <FormattedMessage id={ 'word.update.title' } />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    };
}

export const ChangePassword = withStyles(styles)(ChangePasswordComponent);
