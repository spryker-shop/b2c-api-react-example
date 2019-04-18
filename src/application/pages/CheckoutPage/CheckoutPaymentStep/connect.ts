import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutStepsCompletionState, } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const stepsCompletion: ICheckoutStepsCompletionState = state.pageCheckout.stepsCompletion;

    return ({
        stepsCompletion,
    });
};

export const connect = reduxify(mapStateToProps);
