import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';

import { WishlistState } from '@stores/reducers/pages/wishlist/types';
import {
    addWishlistAction,
    deleteWishlistAction,
    updateWishlistAction,
} from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;

    return ({
        isLoading: wishlistProps ? wishlistProps.pending : false,
        wishlists: wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : null,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addWishlistAction,
            deleteWishlistAction,
            updateWishlistAction,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
