import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutInvoiceState, IFormFieldMutate } from '@interfaces/checkout';
import {
    mutateStateInvoiceFormAction,
    mutatePaymentSectionAction,
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentInvoiceData: ICheckoutInvoiceState = state.pageCheckout.paymentInvoiceData;

    return {
        paymentInvoiceData,
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateInvoiceForm: (payload: IFormFieldMutate): void => {
        dispatch(mutateStateInvoiceFormAction(payload));
    },
    mutatePaymentSection: (payload: boolean): void => {
        dispatch(mutatePaymentSectionAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
