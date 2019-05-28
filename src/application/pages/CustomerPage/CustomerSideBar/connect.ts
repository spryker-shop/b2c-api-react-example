import { reduxify } from '@hoc/Reduxify';
import { IWishlistState } from '@stores/reducers/pages/wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IWishlist } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: IWishlistState = state.pageWishlist ? state.pageWishlist : null;
    const wishlists: IWishlist[] | null = wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : null;

    return {
        wishlists
    };
};

export const connect = reduxify(mapStateToProps);
