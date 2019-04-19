import { ValueFacets } from '@interfaces/searchPageData';
import { RangeType } from '@pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';
import { ClickEvent } from '@interfaces/common';

export interface AttributeFiltersProps extends WithStyles<typeof styles> {
    filters: ValueFacets[];
    openedFilters: ValueFacets[];
    activeFilters: TActiveFilters;
    updateStore: Function;
    updateActiveFilters: Function;
    width: Breakpoint;
    openFilter: (filter: ValueFacets, filterName: string) => (event: ClickEvent) => void;
    icon: JSX.Element;
}
