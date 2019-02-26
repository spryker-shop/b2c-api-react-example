import { IActionData, IReduxState } from '@stores/reducers/types';
import { FlyoutSearch, ICatalogSearchDataParsed, ISearchPageData } from '@interfaces/searchPageData';

export interface ISearchState extends IReduxState {
    data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
    payloadSearchFulfilled?: ICatalogSearchDataParsed;
    payloadSuggestionFulfilled?: FlyoutSearch;
}
