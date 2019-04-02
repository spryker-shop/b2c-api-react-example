import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@application/hoc/Reduxify';
import { WishlistState } from '@stores/reducers/pages/Wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

import { getRouterMatchParam } from '@helpers/router';

import { deleteMultiItemsAction, getDetailWishlistAction } from '@stores/actions/pages/wishlist';
import { multiItemsCartAction } from '@stores/actions/common/cart';

import { isAppInitiated } from '@stores/reducers/common/init/selectors';
import { isWishlistDetailsPresent, isWishlistDetailsStateRejected } from '@stores/reducers/pages/wishlist/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const wishlistIdParam = getRouterMatchParam(state, ownProps, 'wishlistId');
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isWishlistExist = isWishlistDetailsPresent(state, ownProps);
    const isRejected = isWishlistDetailsStateRejected(state, ownProps);

    return ({
        isLoading: wishlistProps ? wishlistProps.pending : false,
        isWishlistExist,
        isRejected,
        isAppDataSet,
        wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null,
        wishlistIdParam
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            multiItemsCartAction,
            deleteMultiItemsAction,
            getDetailWishlistAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
