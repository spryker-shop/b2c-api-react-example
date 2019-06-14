import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import {
    getWishlistsCollectionFromStore,
    isPageWishlistStateLoading,
    isWishlistsCollectionInitiated
} from '@stores/reducers/pages/wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { addItemWishlistAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import { getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IWishlist } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const isWishlistLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishlists: IWishlist[] = getWishlistsCollectionFromStore(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);

    return {
        cartId,
        isUserLoggedIn,
        wishlists,
        isWishlistsFetched,
        isWishlistLoading,
        anonymId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getWishlistsAction,
    addItemWishlistAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
