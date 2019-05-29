import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import {
    getProduct,
    isPageProductStateFulfilled,
    isPageProductStateInitiated,
    isPageProductStateLoading,
    isPageProductStateRejected,
    isProductDetailsPresent,
} from '@stores/reducers/pages/product/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { getRouterMatchParam } from '@helpers/common';
import { getProductDataAction } from '@stores/actions/pages/product';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isWishlistsCollectionInitiated } from '@stores/reducers/pages/wishlist/selectors';
import { IProductDataParsed } from '@interfaces/product';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const product: IProductDataParsed | null = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isLoading: boolean = isPageProductStateLoading(state, ownProps);
    const isRejected: boolean = isPageProductStateRejected(state, ownProps);
    const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
    const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
    const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
    const isProductExist: boolean = isProductDetailsPresent(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const isWishlistsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);

    return {
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
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getProductDataAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
