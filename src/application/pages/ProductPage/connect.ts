import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import {
    getProduct,
    isPageProductStateFulfilled,
    isPageProductStateInitiated,
    isPageProductStateLoading,
    isPageProductStateRejected,
    isProductDetailsPresent,
} from '@stores/reducers/pages/product';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getRouterMatchParam } from '@helpers/router';
import { getProductDataAction } from '@stores/actions/pages/product';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isWishlistsCollectionInitiated } from '@stores/reducers/pages/wishlist/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const product = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isLoading: boolean = isPageProductStateLoading(state, ownProps);
    const isRejected: boolean = isPageProductStateRejected(state, ownProps);
    const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
    const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
    const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
    const isProductExist: boolean = isProductDetailsPresent(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);

    return ({
        product,
        isUserLoggedIn,
        isInitiated,
        isLoading,
        isRejected,
        isFulfilled,
        locationProductSKU,
        isProductExist,
        anonymId,
        isWishlistsFetched
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getProductData: (sku: string) => dispatch(getProductDataAction(sku))
    }),
);
