import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common';
import { ICustomerAddressFormProps as Props, ICustomerAddressFormState as State } from './types';
import { Grid, Button, withStyles, Typography } from '@material-ui/core';
import { styles } from './styles';
import { AddressForm } from '@components/AddressForm';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms/validation';
import { customerAddressConfigInputStable as inputsConfig } from '@constants/customer';
import { SprykerCheckbox } from '@components/UI/SprykerCheckbox';
import { IAddressItem } from '@interfaces/addresses';
import { initialState } from './settings';
import { pathCustomerAddressesPage } from '@constants/routes';
import { PrevIcon } from './icons';

@(withRouter as Function)
@connect
class CustomerAddressFormComponent extends React.Component<Props, State> {
    public state: State = { ...initialState };

    public componentDidMount = (): void => {
        if (this.props.currentAddress) {
            this.setInitialData();

            return;
        }
        if (!this.props.isAddressExist ||
            (this.props.isAddressExist && this.props.addressIdParam !== this.props.currentAddress.id)) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const stateData = this.transformFieldsData();
        const { currentAddress } = this.props;
        const isSameFieldData: boolean[] = [];
        Object.keys(stateData).forEach(fieldName =>
            isSameFieldData.push(currentAddress ? stateData[fieldName] === currentAddress[fieldName] : false));

        if (this.state.isSubmitted && prevProps.isLoading && !this.props.isLoading) {
            this.props.history.push(pathCustomerAddressesPage);
        }

        if (!prevProps.isAddressExist && this.props.isAddressExist) {
            this.setInitialData();
        }

        if (!isSameFieldData.includes(false) && this.state.isFormValid) {
            this.setState({ isFormValid: false });

            return;
        }

        if (prevState.fields !== this.state.fields) {
            this.handleFormValidity();
        }
    };

    protected handleInputChange = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: inputsConfig[name] });
        const isCheckboxes = value === inputsConfig.isDefaultBilling.inputName ||
            value === inputsConfig.isDefaultShipping.inputName;

        this.setState((prevState: State) => ({
            ...this.state,
            fields: {
                ...this.state.fields,
                [name]: { value: isCheckboxes ? !prevState.fields[name].value : value.trim(), isError: !isInputValid }
            }
        }));
    };

    protected handleFormValidity = (): void => {
        const isFormValid = checkFormValidity({ form: this.state.fields, fieldsConfig: inputsConfig });
        this.setState({ isFormValid });
    };

    protected transformFieldsData = (): IAddressItem => {
        const payload: IAddressItem = {};
        const { fields } = this.state;

        Object.keys(fields).forEach(fieldName => {
            if (fieldName === 'country') {
                payload.iso2Code = fields[fieldName].value;

                return;
            }

            payload[fieldName] = fields[fieldName].value;
        });

        return payload;
    };

    protected handleSubmitForm = (): void => {
        const payload = this.transformFieldsData();
        const { currentAddress, updateAddress, addAddress, customer } = this.props;
        this.setState({ isSubmitted: true, isFormValid: false });

        if (currentAddress) {
            updateAddress(currentAddress.id, customer, payload);

            return;
        }
        addAddress(payload, customer);
    };

    protected initRequestData = (): void => {
        if (this.props.isLoading) { return; }

        if (this.props.customer && this.props.addressIdParam) {
            this.props.getOneAddress(this.props.customer, this.props.addressIdParam);
        }
    };

    protected setInitialData = (): void => {
        const { currentAddress } = this.props;
        const { fields } = this.state;
        const stateData: State['fields'] = {};

        if (currentAddress) {
            Object.keys(fields).forEach(fieldName => {
                stateData[fieldName] = { value: '' };

                if (fieldName === 'country') {
                    stateData.country.value = currentAddress['iso2Code'];

                    return;
                }

                stateData[fieldName].value = currentAddress[fieldName].toString();
            });
        }
        this.setState((prevState: State) => ({ fields: { ...prevState.fields, ...stateData } }));
    };

    public render(): JSX.Element {
        const { classes, currentAddress } = this.props;
        const pageTitle = currentAddress ? 'edit.address.title' : 'add.new.address.title';
        const { fields, isFormValid } = this.state;

        return (
            <>
                <Typography component="h1" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ pageTitle } />
                </Typography>
                <AddressForm
                    formName={ 'addressForm' }
                    onFieldChangeHandler={ this.handleInputChange }
                    data={ fields }
                    additionalActions={
                        <>
                            <Grid item xs={ 12 }>
                                <SprykerCheckbox
                                    isChecked={ Boolean(fields.isDefaultBilling.value) }
                                    changeHandler={ this.handleInputChange }
                                    label={ <FormattedMessage id={ 'default.billing.address.label' } /> }
                                    inputName={ inputsConfig.isDefaultBilling.inputName }
                                />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <SprykerCheckbox
                                    isChecked={ Boolean(fields.isDefaultShipping.value) }
                                    changeHandler={ this.handleInputChange }
                                    label={ <FormattedMessage id={ 'default.shipping.address.label' } /> }
                                    inputName={ inputsConfig.isDefaultShipping.inputName }
                                />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <div className={ classes.actions }>
                                    <NavLink to={ pathCustomerAddressesPage } className={ classes.back }>
                                        <span className={ classes.icon }>
                                            <PrevIcon />
                                        </span>
                                        <FormattedMessage id={ 'word.back.title' } />
                                    </NavLink>
                                    <Button
                                        disabled={ !isFormValid }
                                        variant="contained"
                                        onClick={ this.handleSubmitForm }
                                        className={ classes.submit }
                                    >
                                        <FormattedMessage id={ 'word.save.title' } />
                                    </Button>
                                </div>
                            </Grid>
                        </>
                    }
                />
            </>
        );
    }
}

export const CustomerAddressForm = withStyles(styles)(CustomerAddressFormComponent);
