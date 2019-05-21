import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { TSprykerRangeSliderName } from '@components/UI/SprykerRangeSlider/types';
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
    categoriesList: (
        isOpened: boolean,
        onTitleClick: () => void,
        categoryId: number,
        onItemClickHandler: (categoryId: number) => void
    ) => JSX.Element;
    changeWrapperState?: (isOpen: boolean) => void;
    width: Breakpoint;
    currentCategoryId?: number | null;
    changeLocation?: (location: string) => void;
    setCurrentCategory?: (categoryId: number | string) => void;
    locationCategoryId?: number | string;
}

export interface IFiltersListState {
    [key: string]: boolean | (ValueFacets | RangeFacets)[];
    openedFilters: ValueFacets[];
    openedCategories: boolean;
    openedRanges: RangeFacets[];
    selectedMobileCategoryId: number | null;
}
