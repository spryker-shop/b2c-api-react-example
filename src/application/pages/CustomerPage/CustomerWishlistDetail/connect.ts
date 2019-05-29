import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IWishlistState } from '@stores/reducers/pages/Wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getRouterMatchParam } from '@helpers/common';
import { getDetailWishlistAction } from '@stores/actions/pages/wishlist';
import { isAppInitialized } from '@stores/reducers/common/init/selectors';
import { isWishlistDetailsPresent, isWishlistDetailsStateRejected } from '@stores/reducers/pages/wishlist/selectors';
import { IWishlist } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: IWishlistState = state.pageWishlist ? state.pageWishlist : null;
    const wishlistIdParam: string | null = getRouterMatchParam(state, ownProps, 'wishlistId');
    const isAppDataSet: boolean = isAppInitialized(state, ownProps);
    const isWishlistExist: boolean = isWishlistDetailsPresent(state, ownProps);
    const isRejected: boolean = isWishlistDetailsStateRejected(state, ownProps);
    const wishlist: IWishlist | null = wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null;
    const isLoading: boolean = wishlistProps ? wishlistProps.pending : false;

    return {
        isLoading,
        isWishlistExist,
        isRejected,
        isAppDataSet,
        wishlist,
        wishlistIdParam
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getDetailWishlistAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
