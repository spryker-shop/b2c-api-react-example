import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IActiveFilters, RangeFacets, ValueFacets } from '@interfaces/searchPageData';

export interface ISearchFilterListProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    isFulfilled: boolean;
    filters: ValueFacets[];
    activeFilters: TActiveFilters;
    rangeFilters: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    setActiveFilters: (activeFilters: IActiveFilters) => void;
    clearActiveFilters: () => void;
    updateStore: Function;
    categoriesList: (isOpened: boolean, Function: void) => JSX.Element;
    isPageLocked?: (value: boolean) => void;
}

export interface ISearchFilterListState {
    activeFilters?: TActiveFilters;
    activeRangeFilters?: TActiveRangeFilters;
    isFilterUpdated?: boolean;
    isFirstLoadPassed: boolean | null;
    isFilterListOpened: boolean;
}

export type TFilterItemTypeFilter = 'filter';
export type TFilterItemTypeRange = 'range';

export type TFilterItemName = string;
export type TFilterItemType = TFilterItemTypeFilter | TFilterItemTypeRange;

export type RangeType = { min: number, max: number, [name: string]: number };
export type TRangeType = TRangeMinType | TRangeMaxType;

export type TFilterItemValue = number | string | RangeType;

export type TRangeMinType = 'min';
export type TRangeMaxType = 'max';

export const rangeMinType: TRangeMinType = 'min';
export const rangeMaxType: TRangeMaxType = 'max';

export interface IFilterItemToDelete {
    name: TFilterItemName;
    value: TFilterItemValue;
    type: TFilterItemType;
    rangeSubType?: TRangeType;
}

export interface IFilterItem extends IFilterItemToDelete {
    label: string | JSX.Element;
    order?: number;
}

export const filterTypeFilter: TFilterItemTypeFilter = 'filter';
export const filterTypeRange: TFilterItemTypeRange = 'range';

export type TActiveFilters = { [name: string]: string[] };
export type TActiveRangeFilters = { [name: string]: RangeType };
