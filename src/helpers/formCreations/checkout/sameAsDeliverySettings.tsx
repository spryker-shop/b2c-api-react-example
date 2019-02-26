import React from 'react';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { ISameAsDeliveryParams } from './types';
import { FormattedMessage } from 'react-intl';

export const getSameAsDeliveryFormSettings = (formName: string, params: ISameAsDeliveryParams): IFormSettings => {
    const {
        isSameAsDelivery,
        submitHandler,
        inputChangeHandler
    } = params;

    const formSettings: IFormSettings = {
        formName,
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        fields: [
            [
                {
                    type: 'checkbox',
                    inputName: 'sameAsDelivery',
                    inputValue: isSameAsDelivery,
                    spaceNumber: 12,
                    isRequired: false,
                    label: <FormattedMessage id={'same.as.delivery.label'} />,
                    isError: false
                }
            ]
        ]
    };

    return formSettings;
};
