import { IProductCard } from '@interfaces/product';
import { IPagination } from '@containers/AppPagination/types';
import { TActiveFilters, TActiveRangeFilters } from '@pages/SearchPage/SearchFilterList/types';
import { IIndexSignature } from '@interfaces/common';

export interface FilterValue {
    value: string | number;
    doc_count: number | null;
}

export interface ValueFacets {
    name: string;
    docCount: number | null;
    values: FilterValue[];
    activeValue: string | null;
    localizedName: string;
}

export interface RangeFacets {
    name: string;
    min: number;
    max: number;
    activeMin: number;
    activeMax: number;
    docCount: number | null;
    localizedName: string;
}

export interface FlyoutSearch {
    suggestions: IProductCard[] | null;
    categories: { [name: string]: string }[] | null;
    completion: string[] | null;
    pending: boolean;
    fulfilled: boolean;
}

export interface IActiveSort {
    sort: string;
    itemsPerPage: number;
}

export interface IActiveFilters {
    activeFilters: TActiveFilters;
    activeRangeFilters: TActiveRangeFilters;
}

export interface IProductLabelResponse {
    type: string;
    id: string;
}

export interface IAvailableLabel {
    id: string;
    frontEndReference: string;
    isExclusive: boolean;
    name: string;
    position: number;
}

export interface IAvailableLabelsCollection {
    [id: string]: IAvailableLabel;
}

export interface ICatalogSearchDataParsed extends IActiveFilters {
    items: IProductCard[] | null;
    filters: ValueFacets[] | null;
    category: FilterValue[];
    currentCategoryId: number | null;
    currentSort: string | null;
    currentItemsPerPage: number | null;
    currentPaginationPage: number;
    rangeFilters: RangeFacets[] | null;
    sortParams: string[] | null;
    sortParamLocalizedNames: IIndexSignature | null;
    categoriesLocalizedName: string | null;
    pagination: IPagination;
    spellingSuggestion: string | null;
    searchTerm?: string;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
    dispatch?: Function;
    flyoutSearch?: FlyoutSearch;
    currency?: string | null;
    isFiltersUpdated: boolean;
    isCategoryAsFilter: boolean;
}

export interface ISearchQuery {
    q?: string;
    currency?: string | null;
    sort?: string;
    category?: number | string;
    ipp?: number;
    label?: string;
    page?: string | number;

    [key: string]: string | number | string[];
}
