import * as React from 'react';

import { IPaymentMethodsParams } from './types';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { IPaymentMethodGroupItem } from '@constants/checkout/types';

export const getPaymentMethodsFormSettings = (formName: string, params: IPaymentMethodsParams): IFormSettings => {
    const {
        paymentMethodGroupItems,
        currentValuePaymentMethod,
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
                    type: 'radio',
                    inputName: 'paymentMethodSelection',
                    inputValue: currentValuePaymentMethod,
                    spaceNumber: 12,
                    isItemsInRow: true,
                    isRequired: true,
                    label: null,
                    isError: false,
                    radioItems: getRadioItems(paymentMethodGroupItems)
                }
            ]
        ]
    };

    return formSettings;
};

const getRadioItems = (collection: IPaymentMethodsParams['paymentMethodGroupItems']) => {
    const items = convertPaymentsToRadioItems(collection);
    if (!items) {
        return null;
    }

    return items;
};

const isPaymentMethodsExist = (collection: IPaymentMethodsParams['paymentMethodGroupItems']) =>
    Boolean(collection && Array.isArray(collection) && collection.length > 0);

const convertPaymentsToRadioItems = (collection: IPaymentMethodsParams['paymentMethodGroupItems']) =>
    (isPaymentMethodsExist(collection) &&
            collection.map((item: IPaymentMethodGroupItem) => ({
                value: item.value,
                label: createRadioItemLabel(item)
            }))
    );

const createRadioItemLabel = (paymentMethod: IPaymentMethodGroupItem) => {
    const response: React.ReactNode[] = [];
    if (paymentMethod.label) {
        response.push(paymentMethod.label);
    }

    return response;
};
