import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TSalutationVariant } from '@interfaces/customer';
import { InputChangeEvent } from '@interfaces/common';
import { ICountry } from '@interfaces/country';
import { AddressFormState } from './types';

import { IFormField } from '@components/UI/SprykerForm/types';

import { SalutationVariants } from '@constants/customer';

export interface IFieldInput {
    name: string;
    value: string;
}

export const setFormFields = (
    currentState: AddressFormState,
    countries: ICountry[],
    handleCheckBox: (event: InputChangeEvent) => void
): IFormField[][] => {
    const {
        salutation,
        firstName,
        lastName,
        company,
        address1,
        address2,
        address3,
        zipCode,
        city,
        iso2Code,
        phone,
        isDefaultShipping,
        isDefaultBilling,
        submitted,
    } = currentState;

    return ([
        [ {
            type: 'select',
            inputName: 'salutation',
            inputValue: salutation || ' ',
            spaceNumber: 3,
            isRequired: true,
            label: <FormattedMessage id={ 'salutation.label' } />,
            isError: submitted && !salutation,
            menuItems: SalutationVariants,
            menuItemFirst: {
                value: ' ',
                name: <FormattedMessage id={ 'first.item.in.select' } />,
                selected: true,
                disabled: true,
            },
        } ], [ {
            type: 'input',
            inputName: 'firstName',
            inputValue: firstName,
            spaceNumber: 6,
            isRequired: true,
            label: <FormattedMessage id={ 'first.name.label' } />,
            isError: submitted && !firstName,
        }, {
            type: 'input',
            inputName: 'lastName',
            inputValue: lastName,
            spaceNumber: 6,
            isRequired: true,
            label: <FormattedMessage id={ 'last.name.label' } />,
            isError: submitted && !lastName,
        } ], [ {
            type: 'input',
            inputName: 'company',
            inputValue: company,
            spaceNumber: 6,
            label: <FormattedMessage id={ 'company.label' } />,
        } ], [ {
            type: 'input',
            inputName: 'address1',
            inputValue: address1,
            spaceNumber: 6,
            isRequired: true,
            label: <FormattedMessage id={ 'street.label' } />,
            isError: submitted && !address1,
        }, {
            type: 'input',
            inputName: 'address2',
            inputValue: address2,
            spaceNumber: 3,
            isRequired: true,
            label: <FormattedMessage id={ 'number.label' } />,
            isError: submitted && !address2,
        } ], [ {
            type: 'input',
            inputName: 'address3',
            inputValue: address3,
            spaceNumber: 6,
            label: <FormattedMessage id={ 'street.extra.label' } />,
            isError: false,
        } ], [ {
            type: 'input',
            inputName: 'city',
            inputValue: city,
            spaceNumber: 6,
            isRequired: true,
            label: <FormattedMessage id={ 'city.label' } />,
            isError: submitted && !city,
        }, {
            type: 'input',
            inputName: 'zipCode',
            inputValue: zipCode,
            spaceNumber: 3,
            isRequired: true,
            label: <FormattedMessage id={ 'zip.code.label' } />,
            isError: submitted && !zipCode,
        } ], [ {
            type: 'select',
            inputName: 'iso2Code',
            inputValue: iso2Code || ' ',
            spaceNumber: 6,
            isRequired: true,
            label: <FormattedMessage id={ 'country.label' } />,
            isError: submitted && !iso2Code,
            menuItems: countries
                .map((country: ICountry) => ({ value: country.iso2Code, name: country.name })),
            menuItemFirst: {
                value: ' ',
                name: <FormattedMessage id={ 'first.item.in.select' } />,
                selected: true,
                disabled: true,
            },
        }, {
            type: 'input',
            inputName: 'phone',
            inputValue: phone,
            inputType: 'tel',
            spaceNumber: 6,
            label: <FormattedMessage id={ 'phone.label' } />,
        } ], [ {
            type: 'checkbox',
            inputName: 'isDefaultBilling',
            inputValue: isDefaultBilling,
            spaceNumber: 6,
            label: <FormattedMessage id={ 'default.billing.address.label' } />,
            onChangeOwnHandler: handleCheckBox,
        }, {
            type: 'checkbox',
            inputName: 'isDefaultShipping',
            inputValue: isDefaultShipping,
            spaceNumber: 6,
            label: <FormattedMessage id={ 'default.shipping.address.label' } />,
            onChangeOwnHandler: handleCheckBox,
        } ],
    ]);
};
