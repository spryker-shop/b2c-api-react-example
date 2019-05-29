import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { sendSearchAction } from '@stores/actions/pages/search';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IFlyoutSearch } from '@interfaces/search';
import { ICategory, IIndexSignature } from '@interfaces/common';
import { IProductCard } from '@interfaces/product';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: IFlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const currency: string | null = getAppCurrency(state, ownProps);
    const categories: IIndexSignature[] | null = searchProps ? searchProps.categories : null;
    const suggestions: IProductCard[] | null = searchProps ? searchProps.suggestions : null;
    const completion: string[] | null = searchProps ? searchProps.completion : null;
    const isFulfilled: boolean = searchProps ? searchProps.fulfilled : false;

    return {
        categories,
        suggestions,
        isFulfilled,
        completion,
        categoriesTree,
        currency
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    sendSearchAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
