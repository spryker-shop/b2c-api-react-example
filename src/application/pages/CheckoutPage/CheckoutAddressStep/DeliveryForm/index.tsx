import * as React from 'react';
import { connect } from './connect';
import { checkoutFormsNames, checkoutSelectionInputs, newAddressConfigInputStable } from '@constants/checkout';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { InputChangeEvent } from '@interfaces/common';
import { IDeliveryFormProps as Props, TCurrentValueDeliverySelection } from './types';
import { AddressForm } from '@components/AddressForm';
import { SavedAddressForm } from '../SavedAddressForm';
import { FormattedMessage } from 'react-intl';
import { IAddressItemCollection } from '@interfaces/addresses';

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
        const { mutateStateDeliverySelectionAddNewAction, mutateStateDeliverySelectionAddressIdAction } = this.props;

        if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
            mutateStateDeliverySelectionAddNewAction();

            return;
        }

        mutateStateDeliverySelectionAddressIdAction(value);
    };

    protected setDefaultAddresses = (): void => {
        const { addressesCollection: collection, deliverySelection: { isAddNew, selectedAddressId } } = this.props;
        const filteredCollection = Boolean(collection) ? collection.filter((item: IAddressItemCollection) =>
            item.isDefaultShipping === true) : null;
        const defaultValueDelivery = filteredCollection && filteredCollection[0] ? filteredCollection[0].id : null;

        if (isAddNew || Boolean(selectedAddressId)) {
            return;
        }

        if (defaultValueDelivery) {
            this.handleDeliverySelection(defaultValueDelivery);

            return;
        }

        this.handleDeliverySelection(checkoutSelectionInputs.isAddNewDeliveryValue);
    };

    protected handleDeliveryInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const { mutateStateNewAddressDeliveryAction } = this.props;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: newAddressConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateNewAddressDeliveryAction(changedFiledData);
    };

    protected handleDeliveryNewAddressValidity = (): void => {
        const { mutateDeliveryStepAction, deliveryNewAddress, isUserLoggedIn } = this.props;
        const newAddress = { ...deliveryNewAddress };

        if (isUserLoggedIn) {
            delete newAddress.email;
        }

        const isFormValid = checkFormValidity({ form: newAddress, fieldsConfig: newAddressConfigInputStable });
        mutateDeliveryStepAction(isFormValid);
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
                    extraField={{
                        value: checkoutSelectionInputs.isAddNewDeliveryValue,
                        label: <FormattedMessage id={ 'add.new.delivery.address.label' } />
                    }}
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
