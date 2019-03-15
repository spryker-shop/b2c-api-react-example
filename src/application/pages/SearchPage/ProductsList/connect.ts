import { reduxify } from '@application/hoc/Reduxify';
import { getProductsLabeled, getAvailableLabels } from '@stores/reducers/pages/search';
import { getAppCurrency } from '@stores/reducers/common/init';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from '@interfaces/currency';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const productsLabeled = getProductsLabeled(state, ownProps);
    const availableLabels = getAvailableLabels(state, ownProps);

    return ({
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
        products: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : null,
        currency,
        productsLabeled,
        availableLabels
    });
};

export const connect = reduxify(mapStateToProps, null);
