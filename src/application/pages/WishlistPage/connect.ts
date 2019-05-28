import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IWishlistState } from '@stores/reducers/pages/wishlist/types';
import { getWishlistsAction } from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: IWishlistState = state.pageWishlist ? state.pageWishlist : null;
    const isInitial: boolean = wishlistProps && wishlistProps.data ? wishlistProps.data.isInitialList : false;

    return {
        isInitial
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getWishlistsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
