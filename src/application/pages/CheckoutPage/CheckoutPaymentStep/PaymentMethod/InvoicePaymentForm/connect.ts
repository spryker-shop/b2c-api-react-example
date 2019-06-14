import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutInvoiceState } from '@interfaces/checkout';
import { mutateStateInvoiceFormAction, mutatePaymentSectionAction } from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentInvoiceData: ICheckoutInvoiceState = state.pageCheckout.paymentInvoiceData;

    return {
        paymentInvoiceData,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    mutateStateInvoiceFormAction,
    mutatePaymentSectionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
