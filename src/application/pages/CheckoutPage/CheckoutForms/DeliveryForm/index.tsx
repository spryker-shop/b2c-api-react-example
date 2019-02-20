import * as React from 'react';
import { connect } from './connect';
import { Grid, withStyles } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { getAddressFormSettings } from '@helpers/formCreations/checkout/addressSettings';
import { getDeliverySavedAddressFormSettings } from '@helpers/formCreations/checkout/savedAddressSettings';
import {
    checkoutFormsNames,
    checkoutSelectionInputs, creditCardConfigInputStable,
    deliveryConfigInputStable
} from '@constants/checkout';
import { InputSaveErrorMessage } from '@translation';
import {
    checkFormInputValidity,
    checkFormValidity,
    getDefaultAddressId,
    getExtraOptionsToSelection
} from '@helpers/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import {
    IAddressParams,
    IDeliveryAddressesParams
} from '@helpers/formCreations/checkout/types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { IDeliveryFormProps, TCurrentValueDeliverySelection } from './types';
import { IDeliveryAddressState } from '@interfaces/checkout';
import { styles } from './styles';

@connect
export class DeliveryFormBase extends React.Component<IDeliveryFormProps> {
    public componentDidMount = (): void => {
        this.setDefaultAddresses();
    };

    protected handleDeliverySelection = (value: string): void => {
        const {
            mutateStateDeliverySelectionAddNew,
            mutateStateDeliverySelectionAddressId
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
            mutateStateDeliverySelectionAddNew();
            this.handleDeliveryNewAddressValidity();
        } else {
            mutateStateDeliverySelectionAddressId(value);
        }
    };

    protected setDefaultAddresses = (): void => {
        const { addressesCollection } = this.props;
        const defaultValueDelivery = getDefaultAddressId(addressesCollection, 'delivery');
        if (defaultValueDelivery) {
            this.handleDeliverySelection(defaultValueDelivery);
        } else {
            this.handleDeliverySelection(checkoutSelectionInputs.isAddNewDeliveryValue);
        }
    };

    protected validateDeliveryInput = (key: string, value: string): boolean => (
        checkFormInputValidity({ value, fieldConfig: deliveryConfigInputStable[ key ] })
    );

    protected validateDeliveryNewAddressForm = (formState: IDeliveryAddressState): boolean => (
        checkFormValidity({ form: formState, fieldsConfig: deliveryConfigInputStable })
    );

    protected handleDeliveryInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const {
            mutateStateNewAddressDelivery,
            deliveryNewAddress
        } = this.props;

        if (!deliveryNewAddress.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }

        const isInputValid = this.validateDeliveryInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateNewAddressDelivery(changedFiledData);

        const namesList = [
            deliveryConfigInputStable.salutation.inputName,
            deliveryConfigInputStable.country.inputName
        ];

        const isSelectChanged = namesList.includes(name);

        if (isSelectChanged) {
            this.handleDeliveryNewAddressValidity();
        }
    };

    protected handleDeliveryNewAddressValidity = (): void => {
        const { mutateDeliveryStep } = this.props;
        const newAddress = { ...this.props.deliveryNewAddress };

        if (this.props.isUserLoggedIn) {
            delete newAddress.email;
        }
        const isFormValid = this.validateDeliveryNewAddressForm(newAddress);
        mutateDeliveryStep(isFormValid);
    };

    protected handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;

        this.handleDeliverySelection(value);
    };

    protected getCurrentValueDeliverySelection = (): TCurrentValueDeliverySelection => {
        const { selectedAddressId, isAddNew } = this.props.deliverySelection;

        return selectedAddressId || (isAddNew && checkoutSelectionInputs.isAddNewDeliveryValue) || null;
    };

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    public render(): JSX.Element {
        const {
            addressesCollection,
            isUserLoggedIn,
            isAddressesCollectionExist,
            countriesCollection,
            deliveryNewAddress,
            deliverySelection: {
                isAddNew
            }
        } = this.props;

        const deliveryParams: IAddressParams = {
            inputsData: deliveryNewAddress,
            inputsConfig: deliveryConfigInputStable,
            countriesCollection,
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleDeliveryInputs,
            onBlurHandler: this.handleDeliveryNewAddressValidity
        };
        const savedDeliveryParams: IDeliveryAddressesParams = {
            currentValueInSelection: this.getCurrentValueDeliverySelection(),
            addressesCollection,
            extraOptionsToSelection: getExtraOptionsToSelection(
                isAddressesCollectionExist,
                'delivery'
            ),
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleSelectionsChange
        };
        const deliveryFormSettings = getAddressFormSettings(
            checkoutFormsNames.delivery,
            deliveryParams,
            isUserLoggedIn
        );

        const savedAddressFormSettings = getDeliverySavedAddressFormSettings(
            checkoutFormsNames.savedDelivery,
            savedDeliveryParams
        );

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <React.Fragment>
                        { (addressesCollection && addressesCollection.length) &&
                            <SprykerForm form={ savedAddressFormSettings } />
                        }
                        { (isAddNew || !isUserLoggedIn) &&
                            <SprykerForm form={ deliveryFormSettings } />
                        }
                    </React.Fragment>
                </Grid>
            </Grid>
        );
    }
}

export const DeliveryForm = withStyles(styles)(DeliveryFormBase);
