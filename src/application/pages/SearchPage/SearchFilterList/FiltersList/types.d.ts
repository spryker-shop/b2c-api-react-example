import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { TSprykerRangeSliderName } from '@application/components/UI/SprykerRangeSlider/types';
import { RangeType } from '@application/Pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';
import { WithRouter } from '@interfaces/common';

export interface IFiltersListProps extends WithStyles<typeof styles>, WithRouter {
    filters: ValueFacets[];
    activeFilters: TActiveFilters;
    ranges: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    updateStore: Function;
    updateActiveFilters: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: RangeType) => void;
    categoriesList: (isOpened: boolean, Function) => JSX.Element;
    changeWrapperState?: (isOpen: boolean) => void;
    width: Breakpoint;
}

export interface IFiltersListState {
    [key: string]: boolean | (ValueFacets | RangeFacets)[];
    openedFilters: ValueFacets[];
    openedCategories: boolean;
    openedRanges: RangeFacets[];
}
