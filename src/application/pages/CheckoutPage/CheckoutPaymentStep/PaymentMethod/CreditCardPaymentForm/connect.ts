import { reduxify } from '@hoc/Reduxify';
import { mutatePaymentSectionAction, mutateStateCreditCardAction } from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutCreditCardState, IFormFieldMutate } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentCreditCardData: ICheckoutCreditCardState = state.pageCheckout.paymentCreditCardData;

    return {
        paymentCreditCardData
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateCreditCard: (payload: IFormFieldMutate): void => {
        dispatch(mutateStateCreditCardAction(payload));
    },
    mutatePaymentSection: (payload: boolean): void => {
        dispatch(mutatePaymentSectionAction(payload));
    }
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
