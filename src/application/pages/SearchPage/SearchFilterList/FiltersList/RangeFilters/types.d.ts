import { RangeFacets } from '@interfaces/searchPageData';
import { RangeType } from '@pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TSprykerRangeSliderName } from '@components/UI/SprykerRangeSlider/types';

export interface RangeFiltersProps extends WithStyles<typeof styles> {
    ranges: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    updateStore: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: RangeType) => void;
    openedRanges: RangeFacets[];
    openFilter: (filter: RangeFacets, filterName: string) => void;
}
