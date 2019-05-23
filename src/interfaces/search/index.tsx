import { IProductCard } from '@interfaces/product';
import { IPagination } from '@containers/AppPagination/types';
import { IIndexSignature } from '@interfaces/common';

export type TActiveFilters = { [name: string]: string[] };
export type TActiveRangeFilters = { [name: string]: TRangeType };
export type TRangeMinType = 'min';
export type TRangeMaxType = 'max';
export type TFilterItemTypeFilter = 'filter';
export type TFilterItemTypeRange = 'range';
export type TFilterItemName = string;
export type TFilterItemType = TFilterItemTypeFilter | TFilterItemTypeRange;
export type TRangeType = { min: number, max: number, [name: string]: number };
export type TRangesType = TRangeMinType | TRangeMaxType;
export type TFilterItemValue = number | string | TRangeType;

export interface ICatalogSearchDataParsed extends IActiveFilters {
    items: IProductCard[] | null;
    filters: IValueFacets[] | null;
    category: IFilterValue[];
    currentCategoryId: number | null;
    currentSort: string | null;
    currentItemsPerPage: number | null;
    currentPaginationPage: number;
    rangeFilters: IRangeFacets[] | null;
    sortParams: string[] | null;
    sortParamLocalizedNames: IIndexSignature | null;
    categoriesLocalizedName: string | null;
    pagination: IPagination;
    spellingSuggestion: string | null;
    searchTerm?: string;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
    dispatch?: Function;
    flyoutSearch?: IFlyoutSearch;
    currency?: string | null;
    isFiltersUpdated: boolean;
    isCategoryAsFilter: boolean;
}

export interface IFilterValue {
    value: string | number;
    doc_count: number | null;
}

export interface IValueFacets {
    name: string;
    docCount: number | null;
    values: IFilterValue[];
    activeValue: string | null;
    localizedName: string;
}

export interface IRangeFacets {
    name: string;
    min: number;
    max: number;
    activeMin: number;
    activeMax: number;
    docCount: number | null;
    localizedName: string;
}

export interface IFlyoutSearch {
    suggestions: IProductCard[] | null;
    categories: IIndexSignature[] | null;
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

export interface IFilterItemToDelete {
    name: TFilterItemName;
    value: TFilterItemValue;
    type: TFilterItemType;
    rangeSubType?: TRangesType;
}

export interface IFilterItem extends IFilterItemToDelete {
    label: string | JSX.Element;
    order?: number;
}
