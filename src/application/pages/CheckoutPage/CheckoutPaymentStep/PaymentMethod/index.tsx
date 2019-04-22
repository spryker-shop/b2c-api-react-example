import * as React from 'react';
import { connect } from './connect';
import { withStyles, FormControlLabel, Radio, Grid } from '@material-ui/core';
import { InvoicePaymentForm } from './InvoicePaymentForm';
import { CreditCardPaymentForm } from './CreditCardPaymentForm';
import { PartnerIconVisa } from './icons';
import { checkFormValidity } from '@helpers/forms/validation';
import { IPaymentMethod } from '@interfaces/checkout';
import { IPaymentMethodsGrouped, TPaymentProvidersCollection } from '@constants/checkout/types';
import { InputChangeEvent } from '@interfaces/common';
import { IPaymentMethodProps as Props } from './types';
import { IPaymentProviderToIcon } from '@helpers/formCreations/checkout/types';
import { invoiceConfigInputStable, checkoutPaymentMethodsNames, creditCardConfigInputStable } from '@constants/checkout';
import { styles } from './styles';

const PaymentMethodComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, paymentMethod, paymentMethods } = props;
    const isPaymentMethodsExist = Boolean(Array.isArray(paymentMethods) && paymentMethods.length > 0);

    if (!isPaymentMethodsExist) {
        return null;
    }

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;
        const { mutatePaymentMethod, paymentInvoiceData, paymentCreditCardData } = props;
        const { invoice, creditCard } = checkoutPaymentMethodsNames;

        const isInvoiceFormValid = checkFormValidity({
            form: paymentInvoiceData,
            fieldsConfig: invoiceConfigInputStable
        });

        const isCreditCardFormValid = checkFormValidity({
            form: paymentCreditCardData,
            fieldsConfig: creditCardConfigInputStable
        });

        const isPaymentStepCompleted = (value === invoice && isInvoiceFormValid) ||
            (value === creditCard && isCreditCardFormValid);

        mutatePaymentMethod({ value, isPaymentStepCompleted });
    };

    const paymentProviderToIcon: IPaymentProviderToIcon = {
        DummyPayment: <PartnerIconVisa key="visa" />
    };

    const paymentMethodsGrouped: IPaymentMethodsGrouped = {};
    paymentMethods.forEach(item => {
        if (!paymentMethodsGrouped[item.paymentMethodName]) {
            paymentMethodsGrouped[item.paymentMethodName] = [];
        }

        paymentMethodsGrouped[item.paymentMethodName].push(item);
    });

    const creditCardProvidersCollection: TPaymentProvidersCollection = [];

    Object.keys(paymentMethodsGrouped).forEach(key => {
        paymentMethodsGrouped[key].forEach((item: IPaymentMethod) => {
            if (key === checkoutPaymentMethodsNames.creditCard) {
                creditCardProvidersCollection.push({
                    value: item.paymentProviderName,
                    labelIcon: paymentProviderToIcon[item.paymentProviderName]
                });
            }
        });
    });

    const renderCreditCardIcons = (): JSX.Element => {
        const iconItems = Object.values(paymentProviderToIcon).map((icon, index) => (
            <Grid item key={ index }>
                <span className={ classes.labelIcon }>{ icon }</span>
            </Grid>
        ));

        return <Grid container spacing={ 24 }>{ iconItems }</Grid>;
    };

    const renderPaymentItems = (): JSX.Element[] => Object.keys(paymentMethodsGrouped).map(value => {
        const isChecked = paymentMethod === value;
        const isCreditCardForm = value === checkoutPaymentMethodsNames.creditCard;
        const shouldShowInvoiceForm = paymentMethod === checkoutPaymentMethodsNames.invoice;
        const shouldShowCreditCardForm = paymentMethod === checkoutPaymentMethodsNames.creditCard;
        const childForm = !isCreditCardForm ? <InvoicePaymentForm /> :
            <CreditCardPaymentForm providersCollection={ creditCardProvidersCollection } />;
        const inspectionForChildForm = isCreditCardForm ? shouldShowCreditCardForm : shouldShowInvoiceForm;

        return (
            <div className={ classes.formItem } key={`${value}`}>
                <FormControlLabel
                    value={ value }
                    classes={{
                        root: `${classes.inputRadio} ${isChecked ? classes.checkedInputRadio : '' }`,
                        label: `${classes.radioLabel} ${isChecked ? classes.checkedRadioLabel : '' }`
                    }}
                    control={
                        <Radio
                            name="paymentMethodSelection"
                            classes={{ root: classes.radio, checked: classes.checkedRadio }}
                            onChange={ handleSelectionsChange }
                            checked={ value === paymentMethod }
                        />
                    }
                    label={
                        <span className={ classes.label }>
                            { value }
                            { isCreditCardForm && <span>{ renderCreditCardIcons() }</span> }
                        </span>
                    }
                />

                { inspectionForChildForm &&
                    <div className={ classes.formInner }>{ childForm }</div>
                }
            </div>
        );
    });

    return (
        <div className={ classes.root }>
            { renderPaymentItems() }
        </div>
    );
};

export const PaymentMethod = connect(withStyles(styles)(PaymentMethodComponent));
