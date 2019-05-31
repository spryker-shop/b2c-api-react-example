import {
    ISearchPageData,
    ISearchQuery,
    TActiveFilters,
    TActiveRangeFilters,
    IFilterValue
} from '@interfaces/search';
import { History, Location } from 'history';
import { RouteProps } from 'react-router-dom';
import { WithRouter, IBreadcrumbItem, ICategory } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISearchPageProps extends WithStyles<typeof styles>, ISearchPageData, RouteProps, WithRouter {
    isLoading: boolean;
    push: Function;
    categoriesTree: ICategory[];
    location: Location;
    isFulfilled: boolean;
    isFiltersUpdated: boolean;
    locationCategoryId: number | string;
    currentPaginationPage: number;
    sendSearchAction: (params: ISearchQuery) => void;
    clearActiveFiltersAction: () => void;
    clearSortAction: () => void;
    clearPaginationPageAction: () => void;
    isCategoryAsFilter: boolean;
    currency: string;
    searchTerm: string;
    currentSort: string;
    currentItemsPerPage: number;
    activeFilters: TActiveFilters;
    activeRangeFilters: TActiveRangeFilters;
    currentCategoryId: number;
    spellingSuggestion: string;
    category: IFilterValue[];
    history: History;
}

export interface ISearchPageState {
    formattedCategoriesTree: IBreadcrumbItem[];
}
