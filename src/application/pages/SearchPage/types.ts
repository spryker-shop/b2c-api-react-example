import { ISearchPageData, ISearchQuery } from '@interfaces/searchPageData';
import { Location } from 'history';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { ICategory } from '@interfaces/category';

export interface ISearchPageProps extends ISearchPageData, RouteProps, WithRouter {
    isLoading: boolean;
    changeLocation: Function;
    categoriesTree: ICategory[];
    location: Location;
    isFulfilled: boolean;
    locationCategoryId: TCategoryId;
    sendSearch: (params: ISearchQuery) => void;
    clearActiveFilters: () => void;
    clearSearchTerm: () => void;
}

export interface ISearchPageState {
    activeFilters: TActiveFilters;
    activeRangeFilters: TActiveRangeFilters;
    sort: string;
    itemsPerPage: number;
    isFiltersReset: boolean;
    isNeedNewRequest: boolean;
    isReadyToNewRequest: boolean;
    isCategoryAsFilter: boolean;
    selectedCategory?: string | null;
    paginationPage: number | string | null;
}

export type RangeType = { min: number, max: number, [name: string]: number };
export type TCategoryId = number | string;
export type TActiveFilters = { [name: string]: string[] };
export type TActiveRangeFilters = { [name: string]: RangeType };
export type TFilterItemName = string;
export type TFilterItemValue = number | string | RangeType;
export type TFilterItemTypeFilter = 'filter';
export type TFilterItemTypeRange = 'range';
export const filterTypeFilter: TFilterItemTypeFilter = 'filter';
export const filterTypeRange: TFilterItemTypeRange = 'range';
export type TFilterItemType = TFilterItemTypeFilter | TFilterItemTypeRange;

export type TRangeMinType = 'min';
export type TRangeMaxType = 'max';
export const rangeMinType: TRangeMinType = 'min';
export const rangeMaxType: TRangeMaxType = 'max';
export type TRangeType = TRangeMinType | TRangeMaxType;

export interface IFilterItem extends IFilterItemToDelete {
    label: string | JSX.Element;
    order?: number;
}

export interface IFilterItemToDelete {
    name: TFilterItemName;
    value: TFilterItemValue;
    type: TFilterItemType;
    rangeSubType?: TRangeType;
}
