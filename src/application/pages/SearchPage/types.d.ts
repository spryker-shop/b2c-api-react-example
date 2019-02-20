import { ISearchPageData, ISearchQuery } from 'src/shared/interfaces/searchPageData';
import { Location } from 'history';
import { RouteProps } from 'react-router';
import { WithRouter } from 'src/shared/interfaces/common/react';
import { ICategory } from 'src/shared/interfaces/category';

export interface ISearchPageProps extends ISearchPageData, RouteProps, WithRouter {
    isLoading: boolean;
    changeLocation: Function;
    categoriesTree: ICategory[];
    location: Location;
    isFulfilled: boolean;
    isFiltersUpdated: boolean;
    locationCategoryId: TCategoryId;
    currentPaginationPage: number;

    sendSearch: (params: ISearchQuery) => void;
    clearActiveFilters: () => void;
    clearSearchTerm: () => void;
    clearSort: () => void;
    clearPaginationPage: () => void;
}

export type TCategoryId = number | string;
