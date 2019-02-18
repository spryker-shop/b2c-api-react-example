import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { WishlistState } from '@stores/reducers/Pages/Wishlist/types';
import { getAppCurrency, isAppInitiated } from '@stores/reducers/common/init/index';
import { TCartId } from 'src/shared/interfaces/cart';
import { deleteItemAction, deleteMultiItemsAction, getDetailWishlistAction } from '@stores/actions/pages/wishlist';
import { addItemToCartAction, multiItemsCartAction } from '@stores/actions/common/cart';
import { push } from 'connected-react-router';
import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from 'src/shared/interfaces/currency/index';
import { getRouterMatchParam } from 'src/shared/helpers/router';
import { isWishlistDetailsPresent, isWishlistDetailsStateRejected } from '@stores/reducers/pages/wishlist/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
    const cartLoading: boolean = isCartStateLoading(state, ownProps);
    const wishlistIdParam = getRouterMatchParam(state, ownProps, 'wishlistId');
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isWishlistExist = isWishlistDetailsPresent(state, ownProps);
    const isRejected = isWishlistDetailsStateRejected(state, ownProps);

    return ({
        wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null,
        products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : null,
        isLoading: wishlistProps ? wishlistProps.pending : false,
        currency,
        cartId,
        cartItemsLength,
        cartLoading,
        wishlistIdParam,
        isAppDataSet,
        isWishlistExist,
        isRejected
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changeLocation: (location: string) => push(location),
            deleteItemAction,
            addItemToCartAction,
            multiItemsCartAction,
            deleteMultiItemsAction,
            getDetailWishlistAction,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
