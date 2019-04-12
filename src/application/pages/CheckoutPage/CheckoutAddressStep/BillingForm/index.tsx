import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { getAddressFormSettings } from '@helpers/formCreations/checkout/addressSettings';
import { getSameAsDeliveryFormSettings } from '@helpers/formCreations/checkout/sameAsDeliverySettings';
import { getBillingSavedAddressFormSettings } from '@helpers/formCreations/checkout/savedAddressSettings';
import {
    checkFormInputValidity,
    checkFormValidity,
    getDefaultAddressId,
    getExtraOptionsToSelection
} from '@helpers/checkout';
import {
    billingConfigInputStable,
    checkoutFormsNames,
    checkoutSelectionInputs,
} from '@constants/checkout';
import { InputSaveErrorMessage } from '@translation/';
import {
    IAddressParams,
    IBillingAddressesParams,
    ISameAsDeliveryParams
} from '@helpers/formCreations/checkout/types';
import { IBillingFormProps } from './types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingAddressState } from '@interfaces/checkout';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

@connect
export class BillingFormBase extends React.Component<IBillingFormProps> {
    public componentDidMount = (): void => {
        this.setDefaultAddresses();
    };

    protected setDefaultAddresses = (): void => {
        const defaultValueBilling = getDefaultAddressId(this.props.addressesCollection, 'billing');
        if (defaultValueBilling) {
            this.handleBillingSelection(defaultValueBilling);
        } else {
            this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue);
        }
    };

    protected validateBillingInput = (key: string, value: string): boolean => (
        checkFormInputValidity({ value, fieldConfig: billingConfigInputStable[ key ] })
    );

    protected validateBillingNewAddressForm = (formState: IBillingAddressState): boolean => (
        checkFormValidity({ form: formState, fieldsConfig: billingConfigInputStable })
    );

    protected handleBillingInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const {
            mutateStateNewAddressBilling,
            billingNewAddress
        } = this.props;

        if (!billingNewAddress.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }

        const isInputValid = this.validateBillingInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateNewAddressBilling(changedFiledData);

        const namesList = [
            billingConfigInputStable.salutation.inputName,
            billingConfigInputStable.country.inputName
        ];

        const isSelectChanged = namesList.includes(name);

        if (isSelectChanged) {
            this.handleBillingNewAddressValidity();
        }
    };

    protected handleBillingNewAddressValidity = (): boolean => {
        const { mutateBillingStep, billingNewAddress } = this.props;
        const isFormValid = this.validateBillingNewAddressForm(billingNewAddress);
        mutateBillingStep(isFormValid);

        return isFormValid;
    };

    protected handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;

        this.handleBillingSelection(value);
    };

    protected handleBillingSelection = (value: string): void => {
        const {
            mutateStateBillingSelectionSameAsDelivery,
            mutateStateBillingSelectionAddressId,
            mutateStateBillingSelectionAddNew
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewBillingValue) {
            mutateStateBillingSelectionAddNew();
        } else if (value === checkoutSelectionInputs.isSameAsDeliveryValue) {
            mutateStateBillingSelectionSameAsDelivery();
        } else {
            mutateStateBillingSelectionAddressId(value);
        }
    };

    protected getCurrentValueBillingSelection = (): IAddressItemCollection['id'] | string | null => (
        this.props.billingSelection.selectedAddressId
        || (this.props.billingSelection.isAddNew && checkoutSelectionInputs.isAddNewBillingValue)
        || (this.props.billingSelection.isSameAsDelivery && checkoutSelectionInputs.isSameAsDeliveryValue)
        || null
    );

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    public render(): JSX.Element {
        const {
            billingNewAddress,
            addressesCollection,
            isAddressesCollectionExist,
            isUserLoggedIn,
            countriesCollection,
            billingSelection: {
                isAddNew,
                isSameAsDelivery
            }
        } = this.props;

        const billingParams: IAddressParams = {
            inputsData: billingNewAddress,
            inputsConfig: billingConfigInputStable,
            countriesCollection,
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleBillingInputs,
            onBlurHandler: this.handleBillingNewAddressValidity
        };
        const sameAsDeliveryParams: ISameAsDeliveryParams = {
            isSameAsDelivery,
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleSelectionsChange
        };
        const savedBillingParams: IBillingAddressesParams = {
            currentValueInSelection: this.getCurrentValueBillingSelection(),
            addressesCollection,
            extraOptionsToSelection: getExtraOptionsToSelection(
                isAddressesCollectionExist,
                'billing'
            ),
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleSelectionsChange
        };
        const billingFormSettings = getAddressFormSettings(checkoutFormsNames.billing, billingParams, true);
        const sameAsDeliveryFormSettings = getSameAsDeliveryFormSettings(
            checkoutFormsNames.sameAsDeliveryForm,
            sameAsDeliveryParams
        );
        const savedAddressFormSettings = getBillingSavedAddressFormSettings(
            checkoutFormsNames.savedBilling,
            savedBillingParams
        );

        const inputsForm = isSameAsDelivery ? null :
            <SprykerForm key="inputsForm" form={ billingFormSettings } />;
        const sameAsDeliveryForm = <SprykerForm key="sameAsDeliveryForm"
                                                form={ sameAsDeliveryFormSettings } />;
        const selectionForm = <SprykerForm key="selectionForm" form={ savedAddressFormSettings } />;

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    { isUserLoggedIn
                        ? (
                            <>
                                { addressesCollection && addressesCollection.length
                                    ? selectionForm
                                    : sameAsDeliveryForm
                                }
                                { isAddNew && inputsForm }
                            </>
                        )
                        : [ sameAsDeliveryForm, inputsForm ]
                    }
                </Grid>
            </Grid>
        );
    }
}

export const BillingFormComponent = withStyles(styles)(BillingFormBase);
