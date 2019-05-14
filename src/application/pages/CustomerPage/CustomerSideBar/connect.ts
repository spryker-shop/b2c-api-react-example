import { reduxify } from '@hoc/Reduxify';
import { WishlistState } from '@stores/reducers/pages/wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;

    return ({
        wishlists: wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : null,
    });
};

export const connect = reduxify(mapStateToProps);
