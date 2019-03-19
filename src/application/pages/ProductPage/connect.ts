import { reduxify } from '@application/hoc/Reduxify';
import { getAnonymId, isAppInitiated } from '@stores/reducers/common/init';
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

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const product = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isLoading: boolean = isPageProductStateLoading(state, ownProps);
    const isRejected: boolean = isPageProductStateRejected(state, ownProps);
    const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
    const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
    const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
    const isProductExist: boolean = isProductDetailsPresent(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        product,
        isAppDataSet,
        isUserLoggedIn,
        isInitiated,
        isLoading,
        isRejected,
        isFulfilled,
        locationProductSKU,
        isProductExist,
        anonymId,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getProductData: (sku: string) => dispatch(getProductDataAction(sku))
    }),
);
