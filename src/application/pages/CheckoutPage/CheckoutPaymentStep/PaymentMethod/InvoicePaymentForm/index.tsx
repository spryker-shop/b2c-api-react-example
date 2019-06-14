import * as React from 'react';
import { connect } from './connect';
import { Grid } from '@material-ui/core';
import { checkoutFormsNames, invoiceConfigInputStable } from '@constants/checkout';
import { InputChangeEvent } from '@interfaces/common';
import { IInvoicePaymentFormProps as Props } from './types';
import { checkFormInputValidity, checkFormValidity, dateBirthFormat } from '@helpers/forms';
import { FormattedMessage } from 'react-intl';
import { CalendarIcon } from './icons';
import { SprykerInput } from '@components/UI/SprykerInput';

@connect
export class InvoicePaymentForm extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.paymentInvoiceData !== this.props.paymentInvoiceData;

        if (shouldCheckFormValidity) {
            this.handleInvoiceValidity();
        }
    };

    protected handleInvoiceInputs = (event: InputChangeEvent): void => {
        const { mutateStateInvoiceFormAction } = this.props;
        const { name, value } = event.target;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: invoiceConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateInvoiceFormAction(changedFiledData);
    };

    protected handleInvoiceValidity = (): void => {
        const { paymentInvoiceData, mutatePaymentSectionAction } = this.props;
        const isFormValid = checkFormValidity({ form: paymentInvoiceData, fieldsConfig: invoiceConfigInputStable });
        mutatePaymentSectionAction(isFormValid);
    };

    public render = (): JSX.Element => {
        const { paymentInvoiceData } = this.props;

        return (
            <form name={ checkoutFormsNames.invoice }>
                <Grid container spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.date.of.birth.label' } /> }
                            inputName={ invoiceConfigInputStable.dateOfBirth.inputName }
                            onChangeHandler={ this.handleInvoiceInputs }
                            inputValue={ paymentInvoiceData.dateOfBirth.value }
                            isError={ paymentInvoiceData.dateOfBirth.isError }
                            iconProps={{
                                iconStartComponent: {
                                    icon: <CalendarIcon />
                                }
                            }}
                            maskProps={{
                                format: dateBirthFormat,
                                placeholder: 'DD/MM/YYYY'
                            }}
                            errorText={ <FormattedMessage id={ 'date.of.birth.error.message' } /> }
                        />
                    </Grid>
                </Grid>
            </form>
        );
    };
}
