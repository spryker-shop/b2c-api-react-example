import { SalutationVariants } from '@constants/customer';
import { TSalutationVariant } from '@interfaces/customer';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { IAddressParams } from './types';
import { ICountry } from '@interfaces/country';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export const getAddressFormSettings = (
    formName: string,
    params: IAddressParams,
    shouldNotShowEmail: boolean
): IFormSettings => {
    const {
        inputsData: {
            firstName,
            lastName,
            salutation,
            address1,
            address2,
            address3,
            email,
            zipCode,
            city,
            country,
            company,
            phone
        },
        inputsConfig: {
            firstName: firstNameConfig,
            lastName: lastNameConfig,
            salutation: salutationConfig,
            address1: address1Config,
            address2: address2Config,
            address3: address3Config,
            zipCode: zipCodeConfig,
            city: cityConfig,
            country: countryConfig,
            company: companyConfig,
            phone: phoneConfig,
            email: emailConfig
        },
        countriesCollection,
        submitHandler,
        inputChangeHandler,
        onBlurHandler
    } = params;

    const isCountriesCollectionExist = Boolean(Array.isArray(countriesCollection) && countriesCollection.length > 0);

    const formSettings: IFormSettings = {
        formName,
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        onBlurHandler,
        fields: [
            [
                {
                    type: 'select',
                    inputName: salutationConfig.inputName,
                    inputValue: salutation.value,
                    spaceNumber: 3,
                    isRequired: salutationConfig.isRequired,
                    label: <FormattedMessage id={'salutation.label'} />,
                    isError: salutation.isError,
                    menuItems: SalutationVariants
                        .map((item: TSalutationVariant) => ({value: item.value, name: item.label})),
                    menuItemFirst: {
                        value: ' ',
                        name: <FormattedMessage id={'first.item.in.select'} />,
                        selected: true,
                        disabled: true
                    }
                }
            ],
            [
                {
                    type: 'input',
                    inputName: firstNameConfig.inputName,
                    inputValue: firstName.value,
                    spaceNumber: 6,
                    isRequired: firstNameConfig.isRequired,
                    label: <FormattedMessage id={'first.name.label'} />,
                    isError: firstName.isError
                },
                {
                    type: 'input',
                    inputName: lastNameConfig.inputName,
                    inputValue: lastName.value,
                    spaceNumber: 6,
                    isRequired: lastNameConfig.isRequired,
                    label: <FormattedMessage id={'last.name.label'} />,
                    isError: lastName.isError
                }
            ],
            [
                {
                    type: 'input',
                    inputName: companyConfig.inputName,
                    inputValue: company.value,
                    spaceNumber: 6,
                    isRequired: companyConfig.isRequired,
                    label: <FormattedMessage id={'company.label'} />,
                    isError: company.isError
                }
            ],
            [
                {
                    type: 'input',
                    inputName: address1Config.inputName,
                    inputValue: address1.value,
                    spaceNumber: 6,
                    isRequired: address1Config.isRequired,
                    label: <FormattedMessage id={'street.label'} />,
                    isError: address1.isError
                },
                {
                    type: 'input',
                    inputName: address2Config.inputName,
                    inputValue: address2.value,
                    spaceNumber: 3,
                    isRequired: address2Config.isRequired,
                    label: <FormattedMessage id={'number.label'} />,
                    isError: address2.isError
                }
            ],
            [
                {
                    type: 'input',
                    inputName: address3Config.inputName,
                    inputValue: address3.value,
                    spaceNumber: 6,
                    isRequired: address3Config.isRequired,
                    label: <FormattedMessage id={'street.extra.label'} />,
                    isError: address3.isError
                }
            ],
            [
                {
                    type: 'input',
                    inputType: 'email',
                    inputName: emailConfig.inputName,
                    inputValue: email.value,
                    spaceNumber: 6,
                    isRequired: emailConfig.isRequired,
                    label: <FormattedMessage id={'email.label'} />,
                    isError: email.isError
                }
            ],
            [
                {
                    type: 'input',
                    inputName: cityConfig.inputName,
                    inputValue: city.value,
                    spaceNumber: 6,
                    isRequired: cityConfig.isRequired,
                    label: <FormattedMessage id={'city.label'} />,
                    isError: city.isError
                },
                {
                    type: 'input',
                    inputName: zipCodeConfig.inputName,
                    inputValue: zipCode.value,
                    spaceNumber: 6,
                    isRequired: zipCodeConfig.isRequired,
                    label: <FormattedMessage id={'zip.code.label'} />,
                    isError: zipCode.isError
                }
            ],
            [
                {
                    type: 'select',
                    inputName: countryConfig.inputName,
                    inputValue: country.value,
                    spaceNumber: 6,
                    isRequired: countryConfig.isRequired,
                    label: <FormattedMessage id={'country.label'} />,
                    isError: country.isError,
                    menuItems: isCountriesCollectionExist
                        ? countriesCollection
                            .map((item: ICountry) => ({value: item.iso2Code, name: item.name}))
                        : null,
                    menuItemFirst: {
                        value: ' ',
                        name: <FormattedMessage id={'first.item.in.select'} />,
                        selected: true,
                        disabled: true
                    }
                },
                {
                    type: 'input',
                    inputName: phoneConfig.inputName,
                    inputValue: phone.value,
                    spaceNumber: 6,
                    isRequired: phoneConfig.isRequired,
                    label: <FormattedMessage id={'phone.label'} />,
                    isError: phone.isError
                }
            ]
        ]
    };

    if (shouldNotShowEmail) {
        formSettings.fields.splice(5, 1);
    }

    return formSettings;
};
