import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { mutatePaymentSectionAction, mutateStateCreditCardAction } from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutCreditCardState } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentCreditCardData: ICheckoutCreditCardState = state.pageCheckout.paymentCreditCardData;

    return {
        paymentCreditCardData
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    mutateStateCreditCardAction,
    mutatePaymentSectionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
