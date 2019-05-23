import { reduxify } from '@hoc/Reduxify';
import { getPayloadForCreateCart } from '@stores/reducers/common/init/selectors';
import { addItemToCartAction, createCartAndAddItemAction } from '@stores/actions/common/cart';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartCreatePayload, ICartAddItem } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
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
    addItemToCart: (payload: ICartAddItem, cartId: string) => dispatch(addItemToCartAction(payload, cartId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
