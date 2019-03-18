import { reduxify } from '@application/hoc/Reduxify';
import { isPageLoginStateLoading, isUserAuthenticated } from '@stores/reducers/pages/login';
import { customerRegisterAction, loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerLoginData, ICustomerProfile } from '@interfaces/customer';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;

    return ({ isAuth, isLoading });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    handleSubmitRegisterForm: (data: ICustomerProfile): void => dispatch(customerRegisterAction(data)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
