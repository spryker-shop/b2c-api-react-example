import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import {
    IUpdateProfileProps as Props,
    IUpdateProfileState as State,
    IProfileFieldInput
} from './types';
import { TSalutationVariant } from '@interfaces/customer';
import { SprykerButton } from '@components/UI/SprykerButton';
import { SprykerForm } from '@components/UI/SprykerForm';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { CustomerPageTitle } from '@components/CustomerPageTitle';
import { SalutationVariants } from '@constants/customer';
import { typeNotificationWarning } from '@constants/notifications';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from '../styles';

@connect
export class UpdateProfileComponent extends React.Component<Props, State> {
    readonly state: State = {
        salutation: this.props.customerData ? this.props.customerData.salutation : '',
        firstName: this.props.customerData ? this.props.customerData.firstName : '',
        lastName: this.props.customerData ? this.props.customerData.lastName : '',
        email: this.props.customerData ? this.props.customerData.email : ''
    };

    protected handleInputChange = (event: { target: IProfileFieldInput }): void => {
        const { name, value }: IProfileFieldInput = event.target;
        const cleanValue = value.trim();

        if (this.state.hasOwnProperty(name) && this.state[name] !== cleanValue) {
            this.setState({
                ...this.state,
                [name]: cleanValue
            });
        }
    };

    protected handleSubmitUpdateProfile = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!this.props.customerReference) {
            return;
        }

        const {firstName, lastName, salutation, email} = this.state;

        if (!firstName || !lastName || !email || !salutation) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return;
        }

        const profileData = { salutation, firstName, lastName, email };
        this.props.updateCustomerData(this.props.customerReference, profileData);
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        const { firstName, lastName, salutation, email } = this.state;

        const formOptions = {
            formName: 'profileForm',
            onChangeHandler: this.handleInputChange,
            onSubmitHandler: this.handleSubmitUpdateProfile,
            fields: [
                [ {
                    type: 'select',
                    inputName: 'salutation',
                    inputValue: salutation,
                    spaceNumber: 2,
                    isRequired: true,
                    label: <FormattedMessage id={ 'salutation.label' } />,
                    isError: false,
                    menuItems: SalutationVariants,
                }, {
                    type: 'input',
                    inputName: 'firstName',
                    inputValue: firstName,
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'first.name.label' } />,
                    isError: false,
                }, {
                    type: 'input',
                    inputName: 'lastName',
                    inputValue: lastName,
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'last.name.label' } />,
                    isError: false,
                } ], [ {
                    type: 'input',
                    inputName: 'email',
                    inputValue: email,
                    inputType: 'email',
                    spaceNumber: 5,
                    isRequired: true,
                    label: <FormattedMessage id={ 'email.label' } />,
                    isError: false,
                } ]
            ]
        };

        return (
            <>
                <CustomerPageTitle title="profile" />

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

export const UpdateProfile = withStyles(styles)(UpdateProfileComponent);
