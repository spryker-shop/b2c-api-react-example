import * as React from 'react';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import {
    IAddressesParams,
    IBillingAddressesParams,
    IDeliveryAddressesParams
} from './types';
import { getSalutationToShow } from '@helpers/customer/salutation';
import { FormattedMessage } from 'react-intl';

export const getBillingSavedAddressFormSettings = (
    formName: string,
    params: IBillingAddressesParams): IFormSettings => {

    const {
        addressesCollection,
        submitHandler,
        inputChangeHandler,
        extraOptionsToSelection,
        currentValueInSelection
    } = params;

    const formSettings: IFormSettings = {
        formName,
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        fields: [
            [
                {
                    type: 'radio',
                    inputName: 'billingSelection',
                    inputValue: currentValueInSelection,
                    spaceNumber: 12,
                    isRequired: false,
                    label: <FormattedMessage id={'select.billing.address.label'} />,
                    isError: false,
                    radioItems: getRadioItems(addressesCollection, extraOptionsToSelection)
                }
            ]
        ]
    };

    return formSettings;
};

export const getRadioItems = (
    collection: IAddressesParams['addressesCollection'],
    extraOptions: IAddressesParams['extraOptionsToSelection']) => {
    let items = convertAddressesToRadioItems(collection);

    if (!items) {
        return null;
    }

    if (Array.isArray(extraOptions) && extraOptions.length > 0) {
        items = items.concat(extraOptions);
    }

    return items;
};

export const convertAddressesToRadioItems = (collection: IAddressesParams['addressesCollection']) =>
    (isAddressesCollectionExist(collection) &&
        collection.map((item: IAddressItemCollection) => (
            {value: item.id, label: createRadioItemFullInforamtion(item)}
        ))
    );

const isAddressesCollectionExist = (collection: IAddressesParams['addressesCollection']) =>
    Boolean(collection && Array.isArray(collection) && collection.length > 0);

const createRadioItemFullInforamtion = (address: IAddressItemCollection): string | React.ReactNode => {
    let response: string = '';
    let salutation: React.ReactNode = null;

    if (address.salutation) {
        salutation = getSalutationToShow(address.salutation);
    }

    if (address.firstName) {
        response += ` ${address.firstName}`;
    }
    if (address.lastName) {
        response += ` ${address.lastName}`;
    }
    if (address.address1) {
        response += `, ${address.address1}`;
    }
    if (address.address2) {
        response += ` ${address.address2}`;
    }
    if (address.city) {
        response += `, ${address.city}`;
    }
    if (address.zipCode) {
        response += `, ${address.zipCode}`;
    }
    if (address.country && address.country.name) {
        response += `, ${address.country.name}`;
    }

    return [salutation, response];
};
