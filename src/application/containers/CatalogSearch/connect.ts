import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IFlyoutSearch } from '@interfaces/search';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { clearSuggestions, sendSuggestionAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IIndexSignature } from '@interfaces/common';
import { IProductCard } from '@interfaces/product';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: IFlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: string | null = getAppCurrency(state, ownProps);
    const categories: IIndexSignature[] | null = searchProps ? searchProps.categories : null;
    const suggestions: IProductCard[] | null = searchProps ? searchProps.suggestions : null;
    const completion: string[] | null = searchProps ? searchProps.completion : null;
    const isLoading: boolean = searchProps ? searchProps.pending : false;

    return {
        categories,
        suggestions,
        completion,
        isLoading,
        currency
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearSuggestions,
    sendSuggestionAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
