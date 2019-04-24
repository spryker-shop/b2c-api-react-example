import { reduxify } from '@application/hoc/Reduxify';
import { isUserAuthenticated, isPageLoginStateLoading } from '@stores/reducers/pages/login';
import { loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerLoginData } from '@interfaces/customer';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;

    return ({ isAuth, isLoading });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    handleSubmitLoginForm: (payload: ICustomerLoginData): void => dispatch(loginCustomerAction(payload)),
    getCustomerCart: () => dispatch(getCustomerCartsAction())
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
