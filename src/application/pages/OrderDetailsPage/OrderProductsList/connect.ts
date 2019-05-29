import { reduxify } from '@hoc/Reduxify';
import { addItemToCartAction } from '@stores/actions/common/cart';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartAddItem } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartId: string = getCartId(state, ownProps);

    return ({
        cartId,
        isCartLoading
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    addItemToCart: (payload: ICartAddItem, cartId: string) => dispatch(addItemToCartAction(payload, cartId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
