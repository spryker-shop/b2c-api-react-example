import { IProductCard } from '../product';
import { IPagination } from 'src/shared/components/Common/AppPagination/types';
import { TCategoryId } from 'src/shared/components/Pages/SearchPage/types';
import { TAppCurrency } from 'src/shared/interfaces/currency';
import { TActiveFilters, TActiveRangeFilters } from '@components/Pages/SearchPage/SearchFilterList/types';

export type TSpellingSuggestion = string;
export type TLocalizedName = string;
export type TDocCount = number;
export type TLabelId = string;
export type TSearchTerm = string;

export interface FilterValue {
    value: string | number;
    doc_count: TDocCount | null;
}

export interface ValueFacets {
    name: string;
    docCount: TDocCount | null;
    values: FilterValue[];
    activeValue: string | null;
    localizedName: TLocalizedName;
}

export interface RangeFacets {
    name: string;
    min: number;
    max: number;
    activeMin: number;
    activeMax: number;
    docCount: TDocCount | null;
    localizedName: TLocalizedName;
}

export interface FlyoutSearch {
    suggestions: IProductCard[] | null;
    categories: { [name: string]: string }[] | null;
    completion: string[] | null;
    pending: boolean;
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

export interface IProductsLabeledCollection {
    [id: string]: TLabelId[];
}

export interface IAvailableLabelsCollection {
    [id: string]: IAvailableLabel;
}

export interface ILocalizedNamesMap {
    [key: string]: TLocalizedName;
}

export interface ICatalogSearchDataParsed extends IActiveFilters {
    items: IProductCard[] | null;
    filters: ValueFacets[] | null;
    category: FilterValue[];
    currentCategory: number | null;
    currentSort: string | null;
    currentItemsPerPage: number | null;
    currentPaginationPage: number;
    rangeFilters: RangeFacets[] | null;
    sortParams: string[] | null;
    sortParamLocalizedNames: ILocalizedNamesMap | null;
    categoriesLocalizedName: TLocalizedName | null;
    pagination: IPagination;
    spellingSuggestion: TSpellingSuggestion | null;
    productsLabeled: IProductsLabeledCollection | null;
    availableLabels: IAvailableLabelsCollection | null;
    searchTerm?: TSearchTerm;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
    dispatch?: Function;
    flyoutSearch?: FlyoutSearch;
    currency?: TAppCurrency;
    isFiltersUpdated: boolean;
    isCategoryAsFilter: boolean;
}

export interface ISearchQuery {
    q?: string;
    currency?: TAppCurrency;
    sort?: string;
    category?: TCategoryId;
    ipp?: number;
    label?: string;
    page?: string | number;

    [key: string]: string | number | string[];
}
