import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { forgotPasswordAction } from '@stores/actions/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isPageLoginStateLoading } from '@stores/reducers/pages/login';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateLoading(state, ownProps) : false;

    return ({
        isLoading
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    forgotPasswordAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
