import { IRangeFacets, IValueFacets } from '@interfaces/search';
import { TSprykerRangeSliderName } from '@components/UI/SprykerRangeSlider/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';
import { WithRouter } from '@interfaces/common';

export interface IFiltersListProps extends WithStyles<typeof styles>, WithRouter {
    filters: IValueFacets[];
    activeFilters: TActiveFilters;
    ranges: IRangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    updateStore: Function;
    updateActiveFilters: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: TRangeType) => void;
    categoriesList: (
        isOpened: boolean,
        onTitleClick: () => void,
        categoryId: number,
        onItemClickHandler: (categoryId: number) => void
    ) => JSX.Element;
    changeWrapperState?: (isOpen: boolean) => void;
    width: Breakpoint;
    currentCategoryId?: number;
    push?: (location: string) => void;
    setCurrentCategoryAction?: (categoryId: number | string) => void;
    locationCategoryId?: number | string;
}

export interface IFiltersListState {
    [key: string]: boolean | (IValueFacets | IRangeFacets)[];
    openedFilters: IValueFacets[];
    openedCategories: boolean;
    openedRanges: IRangeFacets[];
    selectedMobileCategoryId: number;
}
