import { reduxify } from '@application/hoc/Reduxify';
import { getCreatedOrder } from '@stores/reducers/pages/checkout/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';
import { getCustomerCartsAction, getGuestCartAction } from '@stores/actions/common/cart';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const orderId: string = getCreatedOrder(state, ownProps);
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);

    return ({
        orderId,
        isUserLoggedIn,
        anonymId
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    clearCheckoutDataForm: (): void => dispatch(clearCheckoutDataForm()),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
    getGuestCart: (anonymId: string) => dispatch(getGuestCartAction(anonymId)),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
