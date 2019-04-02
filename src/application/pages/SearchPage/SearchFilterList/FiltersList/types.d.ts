import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { TSprykerRangeSliderName } from '@application/components/UI/SprykerRangeSlider/types';
import { RangeType } from '@application/Pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IFiltersListProps extends WithStyles<typeof styles> {
    filters: ValueFacets[];
    activeFilters: TActiveFilters;
    ranges: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    updateStore: Function;
    updateActiveFilters: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: RangeType) => void;
    categoriesList: JSX.Element;
}
