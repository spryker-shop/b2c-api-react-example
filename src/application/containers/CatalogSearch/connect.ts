import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { FlyoutSearch } from '@interfaces/searchPageData';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { clearSuggestions, sendSuggestionAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: string | null = getAppCurrency(state, ownProps);

    return ({
        categories: searchProps ? searchProps.categories : null,
        suggestions: searchProps ? searchProps.suggestions : null,
        completion: searchProps ? searchProps.completion : null,
        isLoading: searchProps ? searchProps.pending : null,
        currency
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            clearSuggestions,
            sendSuggestionAction
        },
        dispatch
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
