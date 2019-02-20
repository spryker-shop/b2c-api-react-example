import { IReduxState } from 'src/typings/app';
import {
    FlyoutSearch, IActiveFilters, ICatalogSearchDataParsed, ISearchPageData
} from 'src/shared/interfaces/searchPageData/index';
import { IActionData } from 'src/shared/stores/reducers/types';
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
