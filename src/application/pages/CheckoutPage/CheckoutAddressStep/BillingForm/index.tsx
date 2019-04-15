import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { checkFormInputValidity, checkFormValidity } from '@helpers/checkout';
import { newAddressConfigInputStable, checkoutFormsNames, checkoutSelectionInputs } from '@constants/checkout';
import { IBillingFormProps as Props } from './types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';
import { AddressForm } from '@pages/CheckoutPage/CheckoutAddressStep/AddressForm';
import { FormattedMessage } from 'react-intl';
import { SprykerCheckbox } from '@components/UI/SprykerCheckbox';
import { SavedAddressForm } from '@pages/CheckoutPage/CheckoutAddressStep/SavedAddressForm';

@connect
class BillingFormComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.setDefaultAddresses();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.billingNewAddress !== this.props.billingNewAddress;

        if (shouldCheckFormValidity) {
            this.handleBillingNewAddressValidity();
        }
    };

    protected setDefaultAddresses = (): void => {
        const { addressesCollection: collection } = this.props;
        const { isAddNew, selectedAddressId, isSameAsDelivery } = this.props.billingSelection;
        const filteredCollection = Boolean(collection) ? collection.filter((item: IAddressItemCollection) =>
            item.isDefaultBilling === true) : null;
        const defaultValueBilling = filteredCollection && filteredCollection[0] ? filteredCollection[0].id : null;

        if (isAddNew || Boolean(selectedAddressId) || isSameAsDelivery) {
            return;
        }

        if (defaultValueBilling) {
            this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue, false);
            this.handleBillingSelection(defaultValueBilling);

            return null;
        }

        this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue, true);
    };

    protected handleBillingInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const { mutateStateNewAddressBilling } = this.props;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: newAddressConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateNewAddressBilling(changedFiledData);
    };

    protected handleBillingNewAddressValidity = (): boolean => {
        const { mutateBillingStep, billingNewAddress } = this.props;
        const isFormValid = checkFormValidity({ form: billingNewAddress, fieldsConfig: newAddressConfigInputStable });
        mutateBillingStep(isFormValid);

        return isFormValid;
    };

    protected handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;

        this.handleBillingSelection(value);
    };

    protected handleBillingSelection = (value: string, checker = false): void => {
        const {
            mutateStateBillingSelectionSameAsDelivery,
            mutateStateBillingSelectionAddressId,
            mutateStateBillingSelectionAddNew,
            billingSelection: { isSameAsDelivery }
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewBillingValue) {
            mutateStateBillingSelectionAddNew();

            return null;
        }

        if (value === checkoutSelectionInputs.isSameAsDeliveryValue) {
            const mutatedValue = checker ? checker : !isSameAsDelivery;
            mutateStateBillingSelectionSameAsDelivery(mutatedValue);

            return null;
        }

        mutateStateBillingSelectionAddressId(value);
    };

    protected getCurrentValueBillingSelection = (): IAddressItemCollection['id'] | string | null => {
        const { selectedAddressId, isAddNew, isSameAsDelivery } = this.props.billingSelection;

        return selectedAddressId || (isAddNew && checkoutSelectionInputs.isAddNewBillingValue) ||
            (isSameAsDelivery && checkoutSelectionInputs.isSameAsDeliveryValue) || null;
    };

    public render(): JSX.Element {
        const {
            billingNewAddress,
            addressesCollection,
            isUserLoggedIn,
            billingSelection: { isAddNew, isSameAsDelivery },
            classes
        } = this.props;

        const isAddressCollectionExist = addressesCollection && addressesCollection.length;
        const shouldShowNewAddressForm = isAddressCollectionExist ? isAddNew || !isUserLoggedIn : true;

        return (
            <>
                <form name={ checkoutFormsNames.sameAsDeliveryForm } className={ classes.sameFormCheckbox }>
                    <SprykerCheckbox
                        isChecked={ isSameAsDelivery }
                        changeHandler={ this.handleSelectionsChange }
                        label={ <FormattedMessage id={'same.as.delivery.label'} /> }
                        inputName={ checkoutSelectionInputs.isSameAsDeliveryValue }
                    />
                </form>
                { !isSameAsDelivery &&
                    <>
                        <SavedAddressForm
                            formName={ checkoutFormsNames.savedBilling }
                            currentMode={ this.getCurrentValueBillingSelection() }
                            onFieldChangeHandler={ this.handleSelectionsChange }
                            extraField={{
                                value: checkoutSelectionInputs.isAddNewBillingValue,
                                label: <FormattedMessage id={'add.new.billing.address.label'} />
                            }}
                        />
                        { shouldShowNewAddressForm &&
                            <AddressForm
                                shouldShowEmail
                                formName={ checkoutFormsNames.billing }
                                onFieldChangeHandler={ this.handleBillingInputs }
                                data={ billingNewAddress }
                            />
                        }
                    </>
                }
            </>
        );
    }
}

export const BillingForm = withStyles(styles)(BillingFormComponent);
