import { reduxify } from '@hoc/Reduxify';
import { getAnonymId, getPayloadForCreateCart } from '@stores/reducers/common/init/selectors';
import {
    getWishlistsCollectionFromStore,
    isPageWishlistStateLoading,
    isWishlistsCollectionInitiated
} from '@stores/reducers/pages/wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemWishlistAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import {
    addItemGuestCartAction,
    addItemToCartAction,
    createCartAndAddItemAction
} from '@stores/actions/common/cart';
import { getCartId, isCartCreated, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartCreatePayload, ICartAddItem } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const isWishlistLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishlists = getWishlistsCollectionFromStore(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);

    return ({
        cartCreated,
        cartId,
        payloadForCreateCart,
        isUserLoggedIn,
        wishlists,
        isWishlistsFetched,
        isWishlistLoading,
        anonymId,
        isCartLoading
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getWishlists: () => dispatch(getWishlistsAction()),
    addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemWishlistAction(wishlistId, sku)),
    createCartAndAddItem: (payload: ICartCreatePayload, item: ICartAddItem) =>
        dispatch(createCartAndAddItemAction(payload, item)),
    addItemToCart: (payload: ICartAddItem, cartId: string) => dispatch(addItemToCartAction(payload, cartId)),
    addItemGuestCart: (item: ICartAddItem, anonymId: string) => dispatch(addItemGuestCartAction(item, anonymId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
