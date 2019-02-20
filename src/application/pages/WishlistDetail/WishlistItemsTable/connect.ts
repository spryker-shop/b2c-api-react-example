import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@application/hoc/Reduxify';

import { TCartId } from '@interfaces/cart';
import { TAppCurrency } from '@interfaces/currency';
import { WishlistState } from '@stores/reducers/pages/Wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

import { push } from 'react-router-redux';
import { addItemToCartAction, multiItemsCartAction } from '@stores/actions/common/cart';
import { deleteItemAction } from '@stores/actions/pages/wishlist';

import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { getAppCurrency } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const cartLoading: boolean = isCartStateLoading(state, ownProps);
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return ({
        isLoading: wishlistProps ? wishlistProps.pending : false,
        cartLoading,
        products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : null,
        cartItemsLength,
        cartId,
        currency
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changeLocation: (location: string) => push(location),
            addItemToCartAction,
            multiItemsCartAction,
            deleteItemAction,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
