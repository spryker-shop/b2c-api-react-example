import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterMatchParam } from '@helpers/common';
import { resetPasswordAction } from '@stores/actions/pages/login';
import { isPageLoginStateLoading } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const restoreKey: string = getRouterMatchParam(state, ownProps, 'restoreKey');
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateLoading(state, ownProps) : false;

    return {
        restoreKey,
        isLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    resetPasswordAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
