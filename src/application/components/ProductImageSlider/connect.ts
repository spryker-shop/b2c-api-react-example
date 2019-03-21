import { reduxify } from '@application/hoc/Reduxify';
import { getProductsLabeled, getAvailableLabels } from '@stores/reducers/pages/search';
import { getAppCurrency } from '@stores/reducers/common/init';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from '@interfaces/currency';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const productPage = state.pageProduct.data.selectedProduct;
    const productsLabeled = productPage && productPage.productsLabeled ? productPage.productsLabeled : null;
    const availableLabels = productPage && productPage.availableLabels ? productPage.availableLabels : null;

    return ({
        productsLabeled,
        availableLabels
    });
};

export const connect = reduxify(mapStateToProps, null);
