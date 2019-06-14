import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { reduxify } from '@hoc/Reduxify';
import { resetPasswordAction } from '@stores/actions/pages/login';
import { isPageLoginStateLoading, isPageLoginStateFulfilled } from '@stores/reducers/pages/login/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateLoading(state, ownProps) : false;
    const isFulfilled: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateFulfilled(state, ownProps) : false;

    return {
        isLoading,
        isFulfilled
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    resetPasswordAction,
    push
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
