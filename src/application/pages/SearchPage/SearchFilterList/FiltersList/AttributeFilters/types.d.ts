import { IValueFacets } from '@interfaces/search';
import { RangeType } from '@pages/SearchPage/types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';
import { ClickEvent } from '@interfaces/common';

export interface AttributeFiltersProps extends WithStyles<typeof styles> {
    filters: IValueFacets[];
    openedFilters: IValueFacets[];
    activeFilters: TActiveFilters;
    updateStore: Function;
    updateActiveFilters: Function;
    width: Breakpoint;
    openFilter: (filter: IValueFacets, filterName: string) => (event: ClickEvent) => void;
    icon: JSX.Element;
}
