import { reduxify } from '@hoc/Reduxify';
import { getPayloadForCreateCart } from '@stores/reducers/common/init/selectors';
import { addItemToCartAction, createCartAndAddItemAction } from '@stores/actions/common/cart';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartCreatePayload } from '@services/common/Cart/types';
import { ICartAddItem, TCartId } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);

    return ({
        cartId,
        payloadForCreateCart,
        isCartLoading
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    createCartAndAddItem: (
        payload: ICartCreatePayload,
        item: ICartAddItem
    ) => dispatch(createCartAndAddItemAction(payload, item)),
    addItemToCart: (payload: ICartAddItem, cartId: TCartId) => dispatch(addItemToCartAction(payload, cartId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
