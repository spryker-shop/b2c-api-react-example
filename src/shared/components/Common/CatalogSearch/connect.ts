import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { reduxify } from 'src/shared/lib/redux-helper';
import { FlyoutSearch } from 'src/shared/interfaces/searchPageData';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init';
import { clearSuggestions, sendSearchAction, sendSuggestionAction } from '@stores/actions/pages/search';
import { getProductDataAction } from '@stores/actions/pages/product';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { ICategory } from 'src/shared/interfaces/category';
import { TAppCurrency } from 'src/shared/interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

    return (
        {
            categories: searchProps ? searchProps.categories : null,
            suggestions: searchProps ? searchProps.suggestions : null,
            completion: searchProps ? searchProps.completion : null,
            isLoading: searchProps ? searchProps.pending : null,
            currency,
            categoriesTree,
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            clearSuggestions,
            sendSuggestionAction,
            sendSearchAction,
            getProductDataAction,
            push,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
