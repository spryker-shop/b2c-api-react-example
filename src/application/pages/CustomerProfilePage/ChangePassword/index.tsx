import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { IChangePasswordProps as Props, IChangePasswordState as State, IProfileFieldInput } from './types';
import { typeNotificationWarning } from '@constants/notifications';
import { CustomerPageTitle } from '@components/CustomerPageTitle';
import { SprykerButton } from '@components/UI/SprykerButton';
import { SprykerForm } from '@components/UI/SprykerForm';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from '../styles';

@connect
export class ChangePasswordComponent extends React.Component<Props, State> {
    readonly state: State = {
        password: '',
        newPassword: '',
        confirmPassword: ''
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        if (this.props.passwordUpdated && !prevProps.passwordUpdated) {
            this.clearPasswords();
        }
    };

    protected handleInputChange = (event: { target: IProfileFieldInput }): void => {
        const {name, value}: IProfileFieldInput = event.target;
        const cleanValue = value.trim();

        if (this.state.hasOwnProperty(name) && this.state[name] !== cleanValue) {
            this.setState({...this.state, [name]: cleanValue});
        }
    };

    protected handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { password, newPassword, confirmPassword } = this.state;

        if (!password || !newPassword || !confirmPassword || !this.props.customerReference) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return;
        }

        if (newPassword !== confirmPassword) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return;
        }

        const passwordData = { password, newPassword, confirmPassword };
        this.props.updateCustomerPassword(this.props.customerReference, passwordData);
    };

    protected clearPasswords = (): void => {
        this.setState({
            newPassword: '',
            password: '',
            confirmPassword: ''
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        const { password, newPassword, confirmPassword } = this.state;

        const formOptions = {
            formName: 'passwordForm',
            onChangeHandler: this.handleInputChange,
            onSubmitHandler: this.handleSubmitPassword,
            fields: [
                [ {
                    type: 'input',
                    inputName: 'password',
                    inputValue: password,
                    inputType: 'password',
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'password.label' } />,
                    isError: false,
                } ], [ {
                    type: 'input',
                    inputName: 'newPassword',
                    inputValue: newPassword,
                    inputType: 'password',
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'new.password.label' } />,
                    isError: false,
                }, {
                    type: 'input',
                    inputName: 'confirmPassword',
                    inputValue: confirmPassword,
                    inputType: 'password',
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'confirm.password.label' } />,
                    isError: false,
                } ]
            ]
        };

        return (
            <>
                <CustomerPageTitle title={<FormattedMessage id={ 'change.password.title' } />} />

                <SprykerForm
                    form={ formOptions }
                    SubmitButton={
                        <Grid container>
                            <Grid item xs={ 12 } sm={ 2 }>
                                <SprykerButton
                                    title={ <FormattedMessage id={ 'word.update.title' } /> }
                                    btnType="submit"
                                    extraClasses={ classes.submitButton }
                                />
                            </Grid>
                        </Grid>
                    }
                    formClassName={ classes.form }
                />
            </>
        );
    }
}

export const ChangePassword = withStyles(styles)(ChangePasswordComponent);
