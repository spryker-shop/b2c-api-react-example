import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import {
    getWishlistsCollectionFromStore,
    isPageWishlistStateLoading,
    isWishlistsCollectionInitiated
} from '@stores/reducers/pages/wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemWishlistAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import { getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const isWishlistLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishlists = getWishlistsCollectionFromStore(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        cartId,
        isUserLoggedIn,
        wishlists,
        isWishlistsFetched,
        isWishlistLoading,
        anonymId
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    getWishlists: () => dispatch(getWishlistsAction()),
    addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemWishlistAction(wishlistId, sku))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
