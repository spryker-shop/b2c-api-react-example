import * as React from 'react';
import { connect } from './connect';
import { Grid } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { getInvoiceFormSettings } from '@helpers/formCreations/checkout/invoiceSettings';
import { checkoutFormsNames, invoiceConfigInputStable } from '@constants/checkout';
import { InputSaveErrorMessage } from '@translation';
import { IPaymentInvoiceParams } from '@helpers/formCreations/checkout/types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { ICheckoutInvoiceState } from '@interfaces/checkout';
import { IInvoicePaymentFormProps } from './types';
import { checkFormInputValidity, checkFormValidity } from '@helpers/checkout';

export const InvoicePaymentFormBase: React.SFC<IInvoicePaymentFormProps> = (props): JSX.Element => {
    const {
        paymentInvoiceData,
        mutatePaymentSection,
        mutateStateInvoiceForm
    } = props;

    const validateInvoiceInput = (key: string, value: string): boolean => (
        checkFormInputValidity({ value, fieldConfig: invoiceConfigInputStable[ key ] })
    );

    const validateInvoiceForm = (formState: ICheckoutInvoiceState): boolean => (
        checkFormValidity({ form: formState, fieldsConfig: invoiceConfigInputStable })
    );

    const handleInvoiceInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        if (!paymentInvoiceData.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }
        const isInputValid = validateInvoiceInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateInvoiceForm(changedFiledData);
    };

    const handleInvoiceValidity = (): void => {
        const isFormValid = validateInvoiceForm(paymentInvoiceData);
        mutatePaymentSection(isFormValid);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    const invoiceParams: IPaymentInvoiceParams = {
        inputsData: paymentInvoiceData,
        inputsConfig: invoiceConfigInputStable,
        submitHandler: handleSubmit,
        inputChangeHandler: handleInvoiceInputs,
        onBlurHandler: handleInvoiceValidity
    };

    const invoiceFormSettings = getInvoiceFormSettings(checkoutFormsNames.invoice, invoiceParams);

    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <SprykerForm form={ invoiceFormSettings } />
            </Grid>
        </Grid>
    );
};

export const InvoicePaymentForm = connect(InvoicePaymentFormBase);
