import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { TRangeInputName } from '@components/UI/SprykerRangeFilter/types';
import { RangeType } from '@components/Pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IFiltersListProps extends WithStyles<typeof styles> {
    filters: ValueFacets[];
    activeFilters: TActiveFilters;
    ranges: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;

    updateStore: Function;
    updateActiveFilters: Function;
    updateRangeFilters: (name: TRangeInputName, {min, max}: RangeType) => void;
}
