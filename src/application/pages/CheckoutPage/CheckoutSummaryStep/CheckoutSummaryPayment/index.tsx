import * as React from 'react';
import { connect } from './connect';
import { ICheckoutSummaryPaymentProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { CardIcon, CalendarIcon, PartnerIconVisa } from './icons';
import { FormattedMessage } from 'react-intl';
import { IPaymentProviderToIcon } from '@helpers/formCreations/checkout/types';

const CheckoutSummaryPaymentComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, paymentMethod, paymentInvoiceData, paymentCreditCardData } = props;
    const { dateOfBirth } = paymentInvoiceData;
    const { cardExpiryDate, cardName, cardNumber, paymentProvider } = paymentCreditCardData;
    const transformeDateOfBirth = dateOfBirth.value.toString();
    const formattedDateOfBirth = `${transformeDateOfBirth.slice(0,2)}/${transformeDateOfBirth.slice(2,4)}/` +
        `${transformeDateOfBirth.slice(4,8)}`;

    const transformeExpiryDate = cardExpiryDate.value.toString();
    const formattedExpiryDate = `${transformeExpiryDate.slice(0,2)}/${transformeExpiryDate.slice(2,4)}`;

    const paymentProviderToIcon: IPaymentProviderToIcon = {
        DummyPayment: <PartnerIconVisa key="visa" />
    };

    return (
        <div className={ classes.container }>
            <div className={ classes.row }>
                <span className={ classes.title }>
                    <FormattedMessage id={ 'word.payment.title' } />
                </span>
                <span className={ classes.value }>{ paymentMethod }</span>
            </div>
            { paymentMethod === 'invoice'
                ? (
                    <div className={ classes.row }>
                        <span className={ classes.title }>
                            <FormattedMessage id={ 'payment.date.of.birth.label' } />
                        </span>
                        <span className={ classes.value }>
                            <span className={ classes.icon }>
                                <CalendarIcon />
                            </span>
                            { formattedDateOfBirth }
                        </span>
                    </div>
                )
                : (
                    <>
                        <div className={ classes.row }>
                            <span className={ classes.title }>
                                <FormattedMessage id={ 'payment.provider.label' } />
                            </span>
                            <span className={ classes.value }>
                                <span className={ classes.provider}>
                                    { paymentProviderToIcon[paymentProvider.value.toString()] }
                                </span>
                            </span>
                        </div>
                        <div className={ classes.row }>
                            <span className={ classes.title }>
                                <FormattedMessage id={ 'payment.credit.card.number.label' } />
                            </span>
                            <span className={ classes.value }>
                                <span className={ classes.icon }>
                                    <CardIcon />
                                </span>
                                <span className={ classes.value }>
                                    <span className={ classes.stars }>****   ****   ****   * </span>
                                    { `${cardNumber.value.toString().substr(-3)}` }
                                </span>
                            </span>
                        </div>
                        <div className={ classes.row }>
                            <span className={ classes.title }>
                                <FormattedMessage id={ 'card.holders.name' } />
                            </span>
                            <span className={ classes.value }>
                                { cardName.value }
                            </span>
                        </div>
                        <div className={ classes.row }>
                            <span className={ classes.title }>
                                <FormattedMessage id={ 'payment.expiry.date.label' } />
                            </span>
                                <span className={ classes.value }>
                                    <span className={ classes.icon }>
                                        <CalendarIcon />
                                    </span>
                                    { formattedExpiryDate }
                            </span>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export const CheckoutSummaryPayment = connect(withStyles(styles)(CheckoutSummaryPaymentComponent));
