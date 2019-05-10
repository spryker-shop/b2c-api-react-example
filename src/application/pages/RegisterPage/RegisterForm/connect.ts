import { reduxify } from '@hoc/Reduxify';
import { isPageLoginStateLoading, isUserAuthenticated } from '@stores/reducers/pages/login';
import { customerRegisterAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerProfile } from '@interfaces/customer';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading = isCartStateLoading(state, ownProps);

    return ({ isAuth, isLoading, isCartLoading });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    handleSubmitRegisterForm: (data: ICustomerProfile): void => dispatch(customerRegisterAction(data)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
