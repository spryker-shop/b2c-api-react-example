import { reduxify } from '@hoc/Reduxify';
import { getCreatedOrder } from '@stores/reducers/pages/checkout/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const orderId: string = getCreatedOrder(state, ownProps);
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const isCartLoading = isCartStateLoading(state, ownProps);
    const profile = getCustomerProfile(state, ownProps);

    return ({
        orderId,
        isUserLoggedIn,
        anonymId,
        deliveryNewAddress,
        isCartLoading,
        profile
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    clearCheckoutDataForm: (): void => dispatch(clearCheckoutDataForm()),
    getCustomerCart: (anonymId: string, isUserLoggedIn: boolean) =>
        dispatch(getCustomerCartsAction(anonymId, isUserLoggedIn)),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
