import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemToCartAction } from '@stores/actions/common/cart';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartAddItem } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);

    return ({
        cartId,
        isUserLoggedIn,
        anonymId,
        isCartLoading
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    addItemToCart: (payload: ICartAddItem, cartId: string, anonymId: string, isUserLoggedIn: boolean) =>
        dispatch(addItemToCartAction(payload, cartId, anonymId, isUserLoggedIn))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
