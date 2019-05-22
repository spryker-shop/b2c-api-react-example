import { IReduxState, IActionData } from '@stores/reducers/types';
import {
    IFlyoutSearch,
    IActiveFilters,
    ICatalogSearchDataParsed,
    ISearchPageData,
    IActiveSort
} from '@interfaces/search';

export interface ISearchState extends IReduxState {
    data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
    payloadPaginationPage?: number;
    payloadCurrentCategory?: number;
    payloadActiveSort?: IActiveSort;
    payloadActiveFilters?: IActiveFilters;
    payloadSearchFulfilled?: ICatalogSearchDataParsed;
    payloadSuggestionFulfilled?: IFlyoutSearch;
}
