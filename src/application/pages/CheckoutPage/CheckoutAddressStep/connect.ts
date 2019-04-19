import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICheckoutStepsCompletionState, } from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const stepsCompletion: ICheckoutStepsCompletionState = state.pageCheckout.stepsCompletion;

    return ({
        isUserLoggedIn,
        stepsCompletion,
    });
};

export const connect = reduxify(mapStateToProps);
