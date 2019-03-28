import { reduxify } from '@application/hoc/Reduxify';
import { forgotPasswordAction } from '@stores/actions/pages/login';
import { getRouterHistoryBack } from '@helpers/router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isPageLoginStateLoading } from '@stores/reducers/pages/login';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;

    return ({ routerGoBack, isLoading });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    sendForgotRequest: (email: string) => dispatch(forgotPasswordAction(email))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
