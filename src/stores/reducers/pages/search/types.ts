import { IReduxState, IActionData } from '@stores/reducers/types';
import {
    FlyoutSearch, IActiveFilters, ICatalogSearchDataParsed, ISearchPageData
} from '@interfaces/searchPageData/index';
import { IActiveSort } from '@interfaces/searchPageData';

export interface ISearchState extends IReduxState {
    data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
    payloadPaginationPage?: number;
    payloadCurrentCategory?: number;
    payloadActiveSort?: IActiveSort;
    payloadActiveFilters?: IActiveFilters;
    payloadSearchFulfilled?: ICatalogSearchDataParsed;
    payloadSuggestionFulfilled?: FlyoutSearch;
}
