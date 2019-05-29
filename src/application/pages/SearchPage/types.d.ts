import { ISearchPageData, ISearchQuery } from '@interfaces/search';
import { History, Location } from 'history';
import { RouteProps } from 'react-router';
import { WithRouter, IBreadcrumbItem } from '@interfaces/common';
import { ICategory } from '@interfaces/category';
import { TActiveFilters, TActiveRangeFilters } from '@interfaces/search';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISearchPageProps extends WithStyles<typeof styles>, ISearchPageData, RouteProps, WithRouter {
    isLoading: boolean;
    changeLocation: Function;
    categoriesTree: ICategory[];
    location: Location;
    isFulfilled: boolean;
    isFiltersUpdated: boolean;
    locationCategoryId: number | string;
    currentPaginationPage: number;
    sendSearch: (params: ISearchQuery) => void;
    clearActiveFilters: () => void;
    clearSearchTerm: () => void;
    clearSort: () => void;
    clearPaginationPage: () => void;
    isCategoryAsFilter: boolean;
    currency: string | null;
    searchTerm: string;
    currentSort: string;
    currentItemsPerPage: number;
    activeFilters: TActiveFilters;
    activeRangeFilters: TActiveRangeFilters;
    currentCategoryId: string;
    spellingSuggestion: string;
    category: ICategory;
    history: History;
}

export interface ISearchPageState {
    formattedCategoriesTree: IBreadcrumbItem[];
}
