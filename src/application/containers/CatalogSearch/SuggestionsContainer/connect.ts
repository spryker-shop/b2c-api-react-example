import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { sendSearchAction } from '@stores/actions/pages/search';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init/selectors';

import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IFlyoutSearch } from '@interfaces/search';
import { ICategory } from '@interfaces/common';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: IFlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const currency: string | null = getAppCurrency(state, ownProps);

    return (
        {
            categories: searchProps ? searchProps.categories : null,
            suggestions: searchProps ? searchProps.suggestions : null,
            fulfilled: searchProps ? searchProps.fulfilled : null,
            completion: searchProps ? searchProps.completion : null,
            categoriesTree,
            currency
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            sendSearchAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
