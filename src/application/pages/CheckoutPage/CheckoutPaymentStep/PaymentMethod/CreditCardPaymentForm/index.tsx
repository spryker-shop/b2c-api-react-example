import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Radio, FormControlLabel } from '@material-ui/core';
import { checkFormInputValidity, checkFormValidity } from '@helpers/checkout';
import { checkoutFormsNames, creditCardConfigInputStable } from '@constants/checkout';
import { InputChangeEvent } from '@interfaces/common';
import { ICreditCardPaymentFormProps as Props } from './types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { CardIcon } from './icons';

@connect
export class CreditCardPaymentFormComponent extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.paymentCreditCardData !== this.props.paymentCreditCardData;

        if (shouldCheckFormValidity) {
            this.handleCreditCardValidity();
        }
    };

    protected handleCreditCardInputs = (event: InputChangeEvent): void => {
        const { mutateStateCreditCard } = this.props;
        const { name, value } = event.target;

        const isInputValid = checkFormInputValidity({ value, fieldConfig: creditCardConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateCreditCard(changedFiledData);
    };

    protected handleCreditCardValidity = (): void => {
        const { paymentCreditCardData, mutatePaymentSection } = this.props;

        const isFormValid = checkFormValidity({form: paymentCreditCardData, fieldsConfig: creditCardConfigInputStable});
        mutatePaymentSection(isFormValid);
    };

    protected renderPaymentProviderItems = (): JSX.Element[] => {
        const { classes, providersCollection, paymentCreditCardData } = this.props;
        const selectedValue = paymentCreditCardData.paymentProvider.value;

        return providersCollection.map(item => (
            <Grid item xs={ 3 } key={ item.value }>
                <FormControlLabel
                    value={ item.value }
                    classes={{
                        root: `${classes.inputRadio} ${item.value === selectedValue ? classes.checkedInputRadio : '' }`,
                        label: classes.radioLabel
                    }}
                    control={
                        <Radio
                            name={ creditCardConfigInputStable.paymentProvider.inputName }
                            classes={{ root: classes.radio }}
                            onChange={ this.handleCreditCardInputs }
                            checked={ item.value === selectedValue }
                            checkedIcon={<></>}
                            icon={<></>}
                        />
                    }
                    label={ item.labelIcon }
                />
            </Grid>
        ));
    };

    public render = (): JSX.Element => {
        const { classes, paymentCreditCardData } = this.props;

        return (
            <form name={ checkoutFormsNames.creditCard }>
                <Grid container spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <span className={ classes.label }>
                            <FormattedMessage id={ 'payment.provider.label' } />
                            <span className={ classes.asterisk }>{`${' '}`}*</span>
                        </span>
                        <Grid container spacing={ 16 }>
                            { this.renderPaymentProviderItems() }
                        </Grid>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.number.label' } /> }
                            inputName={ creditCardConfigInputStable.cardNumber.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardNumber.value }
                            isError={ paymentCreditCardData.cardNumber.isError }
                            inputType="number"
                            icon={ <CardIcon />}
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.name.label' } /> }
                            inputName={ creditCardConfigInputStable.cardName.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardName.value }
                            isError={ paymentCreditCardData.cardName.isError }
                        />
                    </Grid>
                    <Grid item xs={ 6 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.expiry.date.label' } /> }
                            inputName={ creditCardConfigInputStable.cardExpiryDate.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardExpiryDate.value }
                            isError={ paymentCreditCardData.cardExpiryDate.isError }
                            inputType="number"
                        />
                    </Grid>
                    <Grid item xs={ 6 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.cvc.label' } /> }
                            inputName={ creditCardConfigInputStable.cardCVC.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardCVC.value }
                            isError={ paymentCreditCardData.cardCVC.isError }
                            inputType="number"
                        />
                    </Grid>
                </Grid>
            </form>
        );
    };
};

export const CreditCardPaymentForm = withStyles(styles)(CreditCardPaymentFormComponent);
