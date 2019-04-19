import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { InvoicePaymentForm } from './InvoicePaymentForm';
import { CreditCardPaymentForm } from './CreditCardPaymentForm';
import {
    PartnerIconVisa,
    PartnerIconPaypal,
    PartnerIconMasterCard
} from './icons';
import { getPaymentMethodsFormSettings } from '@helpers/formCreations/checkout/paymentSettings';
import { checkFormValidity } from '@helpers/checkout';
import {
    IPaymentMethod,
    ICheckoutInvoiceState,
    ICheckoutCreditCardState
} from '@interfaces/checkout';
import {
    IPaymentMethodsGrouped,
    TPaymentProvidersCollection
} from '@constants/checkout/types';
import { FormEvent, InputChangeEvent } from '@interfaces/common';
import { IPaymentMethodProps } from './types';
import {
    IPaymentMethodsParams,
    IPaymentProviderToIcon
} from '@helpers/formCreations/checkout/types';
import {
    creditCardConfigInputStable,
    invoiceConfigInputStable,
    checkoutFormsNames,
    checkoutPaymentMethodsNames
} from '@constants/checkout';
import { styles } from './styles';

export const PaymentMethodBase: React.SFC<IPaymentMethodProps> = (props): JSX.Element => {
    const {
        classes,
        paymentMethod: currentValuePaymentMethod,
        paymentMethods,
        paymentInvoiceData,
        paymentCreditCardData
    } = props;

    const validateInvoiceForm = (formState: ICheckoutInvoiceState): boolean => (
        checkFormValidity({ form: formState, fieldsConfig: invoiceConfigInputStable })
    );

    const validateCreditCardForm = (formState: ICheckoutCreditCardState): boolean => (
        checkFormValidity({ form: formState, fieldsConfig: creditCardConfigInputStable })
    );

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;
        const { mutatePaymentMethod } = props;
        const { invoice, creditCard } = checkoutPaymentMethodsNames;

        const isInvoiceFormValid = validateInvoiceForm(paymentInvoiceData);
        const isCreditCardFormValid = validateCreditCardForm(paymentCreditCardData);

        const isSummaryStepCompleted = (value === invoice && isInvoiceFormValid) ||
            (value === creditCard && isCreditCardFormValid);

        mutatePaymentMethod({ value, isSummaryStepCompleted });
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    const paymentProviderToIcon: IPaymentProviderToIcon = {
        masterCard: <PartnerIconMasterCard key="masterCard" />,
        paypal: <PartnerIconPaypal key="paypal" />,
        visa: <PartnerIconVisa key="visa" />
    };

    const isPaymentMethodsExist = Boolean(Array.isArray(paymentMethods) && paymentMethods.length > 0);
    if (!isPaymentMethodsExist) {
        return null;
    }

    const creditCardProvidersCollection: TPaymentProvidersCollection = [];

    const paymentMethodsGrouped: IPaymentMethodsGrouped = {};
    for (const paymentMethod of paymentMethods) {
        if (!paymentMethodsGrouped[ paymentMethod.paymentMethodName ]) {
            paymentMethodsGrouped[ paymentMethod.paymentMethodName ] = [];
        }
        paymentMethodsGrouped[ paymentMethod.paymentMethodName ].push(paymentMethod);
    }

    const paymentMethodGroupItems: IPaymentMethodsParams['paymentMethodGroupItems'] = [];

    for (const groupName in paymentMethodsGrouped) {
        if (!paymentMethodsGrouped.hasOwnProperty(groupName)
            || !Array.isArray(paymentMethodsGrouped[ groupName ])
            || !paymentMethodsGrouped[ groupName ].length
        ) {
            continue;
        }
        const paymentMethodLabel: React.ReactNode[] = [];
        paymentMethodLabel.push(
            <Typography
                key={ groupName }
                align="left"
                component="p"
                color="inherit"
            >
                { groupName }
            </Typography>
        );

        paymentMethodsGrouped[ groupName ].forEach((item: IPaymentMethod) => {
            if (paymentProviderToIcon[ item.paymentProviderName ]) {
                paymentMethodLabel.push(paymentProviderToIcon[ item.paymentProviderName ]);
            }
            if (groupName === checkoutPaymentMethodsNames.creditCard) {
                creditCardProvidersCollection.push({
                    name: item.paymentProviderName,
                    value: item.paymentProviderName
                });
            }
        });

        paymentMethodGroupItems.push({ value: groupName, label: paymentMethodLabel });
    }

    const paymentMethodsParams = {
        paymentMethodGroupItems,
        currentValuePaymentMethod,
        paymentProviderToIcon,
        submitHandler: handleSubmit,
        inputChangeHandler: handleSelectionsChange
    };
    const paymentMethodFormSettings = getPaymentMethodsFormSettings(
        checkoutFormsNames.paymentMethod,
        paymentMethodsParams
    );

    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <SprykerForm form={ paymentMethodFormSettings } formClassName={ classes.paymentMethodsForm } />
                { (currentValuePaymentMethod === checkoutPaymentMethodsNames.invoice) &&
                <InvoicePaymentForm />
                }
                { (currentValuePaymentMethod === checkoutPaymentMethodsNames.creditCard) &&
                <CreditCardPaymentForm
                    providersCollection={ creditCardProvidersCollection }
                />
                }
            </Grid>
        </Grid>
    );
};

export const PaymentMethod = connect(withStyles(styles)(PaymentMethodBase));
