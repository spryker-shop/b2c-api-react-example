import { reduxify } from '@application/hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/Login';
import { customerRegisterAction, loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerLoginData, ICustomerProfile } from '@interfaces/customer';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);

    return ({
        isAuth
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    handleSubmitRegisterForm: (data: ICustomerProfile): void => dispatch(customerRegisterAction(data)),
    handleSubmitLoginForm: (payload: ICustomerLoginData): void => dispatch(loginCustomerAction(payload)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
