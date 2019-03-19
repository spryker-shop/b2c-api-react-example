import React from 'react';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { IPaymentInvoiceParams } from './types';
import { FormattedMessage } from 'react-intl';

export const getInvoiceFormSettings = (formName: string, params: IPaymentInvoiceParams): IFormSettings => {
    const {
        inputsData: {
            dateOfBirth
        },
        inputsConfig: {
            dateOfBirth: dateOfBirthConfig
        },
        submitHandler,
        inputChangeHandler,
        onBlurHandler
    } = params;

    const formSettings: IFormSettings = {
        formName,
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        onBlurHandler,
        fields: [
            [
                {
                    type: 'input',
                    inputName: dateOfBirthConfig.inputName,
                    inputValue: dateOfBirth.value,
                    spaceNumber: 6,
                    isRequired: dateOfBirthConfig.isRequired,
                    label: <FormattedMessage id={'payment.date.of.birth.label'} />,
                    isError: dateOfBirth.isError
                }
            ]
        ]
    };

    return formSettings;
};
