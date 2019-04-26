import { reduxify } from '@hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/router';
import { resetPasswordAction } from '@stores/actions/pages/login';
import { isPageLoginStateLoading } from '@stores/reducers/pages/login';
import { IResetPasswordPayload } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const restoreKey = getRouterMatchParam(state, ownProps, 'restoreKey');
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;

    return ({ restoreKey, isLoading });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    resetPasswordRequest: (payload: IResetPasswordPayload) => dispatch(resetPasswordAction(payload))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
