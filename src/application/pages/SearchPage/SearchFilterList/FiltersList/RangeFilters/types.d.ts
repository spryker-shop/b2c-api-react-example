import { IRangeFacets } from '@interfaces/search';
import { RangeType } from '@pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TSprykerRangeSliderName } from '@components/UI/SprykerRangeSlider/types';

export interface RangeFiltersProps extends WithStyles<typeof styles> {
    ranges: IRangeFacets[];
    activeRangeFilters: TActiveRangeFilters;
    updateStore: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: RangeType) => void;
    openedRanges: IRangeFacets[];
    openFilter: (filter: IRangeFacets, filterName: string) => void;
}
