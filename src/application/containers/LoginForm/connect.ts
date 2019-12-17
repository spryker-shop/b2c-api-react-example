import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated, isPageLoginStateLoading } from '@stores/reducers/pages/login/selectors';
import { loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { getAnonymId } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps);
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);

    return {
        isUserLoggedIn,
        isLoading,
        isCartLoading,
        anonymId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loginCustomerAction,
    getCustomerCartsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
