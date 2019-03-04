import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { TSprykerRangeSliderName } from '@application/components/UI/SprykerRangeSlider/types';
import { RangeType } from '@application/Pages/SearchPage/types';

export interface IFiltersListProps {
    filters: ValueFacets[];
    activeFilters: TActiveFilters;
    ranges: RangeFacets[];
    activeRangeFilters: TActiveRangeFilters;

    updateStore: Function;
    updateActiveFilters: Function;
    updateRangeFilters: (name: TSprykerRangeSliderName, {min, max}: RangeType) => void;
}
