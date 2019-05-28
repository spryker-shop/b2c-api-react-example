import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TActiveFilters, TActiveRangeFilters, IRangeFacets } from '@interfaces/search';

export interface IActiveFiltersListProps extends WithStyles<typeof styles> {
    activeValuesFilters: TActiveFilters;
    activeValuesRanges: TActiveRangeFilters;
    rangeFilters?: IRangeFacets[];
    resetHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    deleteActiveFilterHandler: Function;
}
