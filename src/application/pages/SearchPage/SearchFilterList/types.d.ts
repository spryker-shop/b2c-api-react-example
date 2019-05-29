import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IActiveFilters, IRangeFacets, IValueFacets, TActiveRangeFilters, TActiveFilters } from '@interfaces/search';

export interface ISearchFilterListProps extends WithStyles<typeof styles> {
    isLoading?: boolean;
    isFulfilled?: boolean;
    filters?: IValueFacets[];
    activeFilters?: TActiveFilters;
    rangeFilters?: IRangeFacets[];
    activeRangeFilters?: TActiveRangeFilters;
    setActiveFiltersAction?: (activeFilters: IActiveFilters) => void;
    clearActiveFiltersAction?: () => void;
    updateStore?: Function;
    categoriesList: (
        isOpened: boolean,
        onTitleClick: () => void,
        categoryId: number,
        onItemClickHandler: (categoryId: number) => void
    ) => JSX.Element;
    isPageLockedFulfilledState?: (value: boolean) => void;
}

export interface ISearchFilterListState {
    activeFilters?: TActiveFilters;
    activeRangeFilters?: TActiveRangeFilters;
    isFilterUpdated?: boolean;
    isFirstLoadPassed: boolean | null;
    isFilterListOpened: boolean;
}
