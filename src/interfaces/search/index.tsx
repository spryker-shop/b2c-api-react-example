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

export interface IFilterValue {
    value: string | number;
    doc_count: number;
}

export interface IValueFacets {
    name: string;
    docCount: number;
    values: IFilterValue[];
    activeValue: string;
    localizedName: string;
}

export interface IRangeFacets {
    name: string;
    min: number;
    max: number;
    activeMin: number;
    activeMax: number;
    docCount: number;
    localizedName: string;
}

export interface IFlyoutSearch {
    suggestions: IProductCard[];
    categories: IIndexSignature[];
    completion: string[];
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
    items: IProductCard[];
    filters: IValueFacets[];
    category: IFilterValue[];
    currentCategoryId: number;
    currentSort: string;
    currentItemsPerPage: number;
    currentPaginationPage: number;
    rangeFilters: IRangeFacets[];
    sortParams: string[];
    sortParamLocalizedNames: IIndexSignature;
    categoriesLocalizedName: string;
    pagination: IPagination;
    spellingSuggestion: string;
    searchTerm?: string;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
    dispatch?: Function;
    flyoutSearch?: IFlyoutSearch;
    currency?: string;
    isFiltersUpdated: boolean;
    isCategoryAsFilter: boolean;
}

export interface ISearchQuery {
    q?: string;
    currency?: string;
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
