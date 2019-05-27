import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { WishlistState } from '@stores/reducers/pages/wishlist/types';
import { getWishlistsAction } from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearOrdersCollectionAction } from '@stores/actions/pages/order';
import { clearAddressAction } from '@stores/actions/pages/addresses';
import { IWishlist } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const wishlist: IWishlist | null = wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null;
    const isWishlistsInitial: boolean = wishlistProps && wishlistProps.data ? wishlistProps.data.isInitialList : false;
    const isWishlistsDetailInitial: boolean = wishlistProps && wishlistProps.data ?
        wishlistProps.data.isInitialDetail : false;

    return ({
        wishlist,
        isWishlistsInitial,
        isWishlistsDetailInitial
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getWishlistsAction,
    clearAddressAction,
    clearOrdersCollectionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
