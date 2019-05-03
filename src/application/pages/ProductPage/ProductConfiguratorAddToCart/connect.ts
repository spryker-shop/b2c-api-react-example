import { reduxify } from '@hoc/Reduxify';
import { getAnonymId, getPayloadForCreateCart } from '@stores/reducers/common/init/selectors';
import {
    getWishlistsCollectionFromStore,
    isPageWishlistStateLoading,
    isWishlistsCollectionInitiated,
} from '@stores/reducers/pages/wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import {
    addItemGuestCartAction,
    addItemToCartAction,
    createCartAndAddItemAction,
} from '@stores/actions/common/cart';
import { getCartId, isCartCreated } from '@stores/reducers/common/cart/selectors';
import { getProductAvailabilityAction } from '@stores/actions/pages/product';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TProductSKU } from '@interfaces/product';
import { ICartCreatePayload } from '@services/common/Cart/types';
import { ICartAddItem, TCartId } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const isWishlistLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishlists = getWishlistsCollectionFromStore(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        cartCreated,
        cartId,
        payloadForCreateCart,
        isUserLoggedIn,
        wishlists,
        isWishlistsFetched,
        isWishlistLoading,
        anonymId,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getWishlists: () => dispatch(getWishlistsAction()),
        addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemAction(wishlistId, sku)),
        createCartAndAddItem: (
            payload: ICartCreatePayload,
            item: ICartAddItem
        ) => dispatch(createCartAndAddItemAction(payload, item)),
        addItemToCart: (payload: ICartAddItem, cartId: TCartId) => dispatch(addItemToCartAction(payload, cartId)),
        addItemGuestCart: (item: ICartAddItem, anonymId: string) => dispatch(addItemGuestCartAction(item, anonymId)),
        getProductAvailability: (sku: TProductSKU) => dispatch(getProductAvailabilityAction(sku)),
    }),
);
