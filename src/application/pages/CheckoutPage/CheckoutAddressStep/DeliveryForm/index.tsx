import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { getDeliverySavedAddressFormSettings } from '@helpers/formCreations/checkout/savedAddressSettings';
import { checkoutFormsNames, checkoutSelectionInputs, deliveryConfigInputStable } from '@constants/checkout';
import {
    checkFormInputValidity,
    checkFormValidity,
    getDefaultAddressId,
    getExtraOptionsToSelection
} from '@helpers/checkout';
import { IDeliveryAddressesParams } from '@helpers/formCreations/checkout/types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { IDeliveryFormProps as Props, TCurrentValueDeliverySelection } from './types';
import { styles } from './styles';
import { AddressForm } from '../AddressForm';

@connect
export class DeliveryFormBase extends React.Component<Props> {
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

    protected handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    public render(): JSX.Element {
        const {
            addressesCollection,
            isUserLoggedIn,
            isAddressesCollectionExist,
            deliveryNewAddress,
            deliverySelection: { isAddNew }
        } = this.props;

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

        const savedAddressFormSettings = getDeliverySavedAddressFormSettings(
            checkoutFormsNames.savedDelivery,
            savedDeliveryParams
        );

        return (
            <>
                { Boolean(addressesCollection) &&
                    <SprykerForm form={ savedAddressFormSettings } />
                }
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

export const DeliveryForm = withStyles(styles)(DeliveryFormBase);
