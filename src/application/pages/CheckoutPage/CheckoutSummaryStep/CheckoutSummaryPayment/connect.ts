import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutCreditCardState, ICheckoutInvoiceState, IPaymentMethod } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentMethod: IPaymentMethod['paymentMethodName'] | null = state.pageCheckout.paymentMethod;
    const paymentInvoiceData: ICheckoutInvoiceState = state.pageCheckout.paymentInvoiceData;
    const paymentCreditCardData: ICheckoutCreditCardState = state.pageCheckout.paymentCreditCardData;

    return {
        paymentMethod,
        paymentInvoiceData,
        paymentCreditCardData

    };
};

export const connect = reduxify(mapStateToProps);
