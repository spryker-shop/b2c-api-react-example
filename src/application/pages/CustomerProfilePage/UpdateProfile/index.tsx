import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IUpdateProfileProps as Props, IUpdateProfileState as State } from './types';
import { SalutationVariants, updateAccountConfigInputStable } from '@constants/customer';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import { SprykerSelect } from '@components/UI/SprykerSelect';
import { SprykerInput } from '@components/UI/SprykerInput';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms/validation';
import { InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

@connect
export class UpdateProfileComponent extends React.Component<Props, State> {
    public readonly state: State = {
        fields: {
            salutation: {
                value: this.props.customerData ? this.props.customerData.salutation : '',
                isError: false
            },
            firstName: {
                value: this.props.customerData ? this.props.customerData.firstName : '',
                isError: false
            },
            lastName: {
                value: this.props.customerData ? this.props.customerData.lastName : '',
                isError: false
            },
            email: {
                value: this.props.customerData ? this.props.customerData.email : '',
                isError: false
            }
        },
        isFormValid: false
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const { fields, isFormValid } = this.state;
        const { customerData } = this.props;
        const shouldCheckFormValidity = prevState.fields !== fields;
        const isDefaultFirstName = fields.firstName.value === customerData.firstName;
        const isDefaultLastName = fields.lastName.value === customerData.lastName;
        const isDefaultEmail = fields.email.value === customerData.email;
        const isDefaultSalutation = fields.salutation.value === customerData.salutation;
        const isDefaultData = isDefaultFirstName && isDefaultLastName && isDefaultEmail && isDefaultSalutation;

        if (isDefaultData && isFormValid) {
            this.setState({ isFormValid: false });

            return;
        }

        if (shouldCheckFormValidity) {
            this.handleFormValidity();
        }
    };

    protected handleInputChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const cleanValue = value.trim();
        const isInputValid = checkFormInputValidity({ value, fieldConfig: updateAccountConfigInputStable[name] });

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
            fieldsConfig: updateAccountConfigInputStable
        });

        this.setState({ isFormValid });
    };

    protected handleSubmitUpdateProfile = (): void => {
        const { customerReference, updateCustomerData } = this.props;
        const { firstName, lastName, salutation, email } = this.state.fields;

        if (!customerReference) {
            return;
        }

        const profileData = {
            salutation: salutation.value.toString(),
            firstName: firstName.value.toString(),
            lastName: lastName.value.toString(),
            email: email.value.toString()
        };

        updateCustomerData(customerReference, profileData);
        this.setState({ isFormValid: false });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;
        const { isFormValid, fields: { firstName, lastName, salutation, email } } = this.state;
        const {
            firstName: firstNameConfig,
            lastName: lastNameConfig,
            salutation: salutationConfig,
            email: emailConfig
        } = updateAccountConfigInputStable;

        return (
            <>
                <Typography component="h1" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ 'word.profile.title' } />
                </Typography>
                <form id="profileForm" name="profileForm" className={ classes.form }>
                    <Grid container direction="column" spacing={ 24 }>
                        <Grid item xs={ 12 }>
                            <SprykerSelect
                                currentMode={ salutation.value }
                                onChangeHandler={ this.handleInputChange }
                                menuItems={ SalutationVariants }
                                label={ <FormattedMessage id={ 'salutation.label' } /> }
                                menuItemFirst={ {
                                    value: ' ',
                                    name: <FormattedMessage id={ 'salutation.label' } />,
                                    disabled: true
                                } }
                                name={ salutationConfig.inputName }
                                isFullWidth
                                isSimple
                                isRequired
                                isError={ salutation.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'first.name.label' } /> }
                                inputName={ firstNameConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ firstName.value }
                                isError={ firstName.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'last.name.label' } /> }
                                inputName={ lastNameConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ lastName.value }
                                isError={ lastName.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SprykerInput
                                isRequired
                                label={ <FormattedMessage id={ 'email.label' } /> }
                                inputName={ emailConfig.inputName }
                                onChangeHandler={ this.handleInputChange }
                                inputValue={ email.value }
                                isError={ email.isError }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button
                                disabled={ !isFormValid }
                                variant="contained"
                                onClick={ this.handleSubmitUpdateProfile }
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

export const UpdateProfile = withStyles(styles)(UpdateProfileComponent);
