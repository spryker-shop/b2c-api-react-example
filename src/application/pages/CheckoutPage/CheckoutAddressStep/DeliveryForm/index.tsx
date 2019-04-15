import * as React from 'react';
import { connect } from './connect';
import { checkoutFormsNames, checkoutSelectionInputs, deliveryConfigInputStable } from '@constants/checkout';
import { checkFormInputValidity, checkFormValidity, getDefaultAddressId } from '@helpers/checkout';
import { InputChangeEvent } from '@interfaces/common';
import { IDeliveryFormProps as Props, TCurrentValueDeliverySelection } from './types';
import { AddressForm } from '../AddressForm';
import { SavedAddressForm } from '../SavedAddressForm';

@connect
export class DeliveryForm extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.setDefaultAddresses();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.deliveryNewAddress !== this.props.deliveryNewAddress;

        if (shouldCheckFormValidity) {
            this.handleDeliveryNewAddressValidity();
        }
    };

    protected handleDeliverySelection = (value: string): void => {
        const { mutateStateDeliverySelectionAddNew, mutateStateDeliverySelectionAddressId } = this.props;

        if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
            mutateStateDeliverySelectionAddNew();

            return;
        }

        mutateStateDeliverySelectionAddressId(value);
    };

    protected setDefaultAddresses = (): void => {
        const { addressesCollection } = this.props;
        const defaultValueDelivery = getDefaultAddressId(addressesCollection, checkoutFormsNames.delivery);

        if (defaultValueDelivery) {
            this.handleDeliverySelection(defaultValueDelivery);

            return;
        }

        this.handleDeliverySelection(checkoutSelectionInputs.isAddNewDeliveryValue);
    };

    protected handleDeliveryInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const { mutateStateNewAddressDelivery } = this.props;

        const isInputValid = checkFormInputValidity({ value, fieldConfig: deliveryConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateNewAddressDelivery(changedFiledData);
    };

    protected handleDeliveryNewAddressValidity = (): void => {
        const { mutateDeliveryStep, deliveryNewAddress, isUserLoggedIn } = this.props;
        const newAddress = { ...deliveryNewAddress };

        if (isUserLoggedIn) {
            delete newAddress.email;
        }

        const isFormValid = checkFormValidity({ form: newAddress, fieldsConfig: deliveryConfigInputStable });
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

    public render(): JSX.Element {
        const { isUserLoggedIn, deliveryNewAddress, deliverySelection: { isAddNew } } = this.props;

        return (
            <>
                <SavedAddressForm
                    formName={ checkoutFormsNames.savedDelivery }
                    currentMode={ this.getCurrentValueDeliverySelection() }
                    onFieldChangeHandler={ this.handleSelectionsChange }
                />
                { (isAddNew || !isUserLoggedIn) &&
                    <AddressForm
                        shouldShowEmail={ !isUserLoggedIn }
                        formName={ checkoutFormsNames.delivery }
                        onFieldChangeHandler={ this.handleDeliveryInputs }
                        data={ deliveryNewAddress }
                    />
                }
            </>
        );
    }
}
