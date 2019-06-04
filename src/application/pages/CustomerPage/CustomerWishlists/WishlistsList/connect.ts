import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IWishlistState } from '@stores/reducers/pages/wishlist/types';
import { addWishlistAction, deleteWishlistAction, updateWishlistAction } from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IWishlist } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: IWishlistState = state.pageWishlist ? state.pageWishlist : null;
    const isLoading: boolean = wishlistProps ? wishlistProps.pending : false;
    const wishlists: IWishlist[] = wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : null;

    return {
        isLoading,
        wishlists
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addWishlistAction,
    deleteWishlistAction,
    updateWishlistAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
