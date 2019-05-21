import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TActiveFilters, TActiveRangeFilters } from '../types';
import { RangeFacets } from '@interfaces/searchPageData';
import { IIndexSignature } from '@interfaces/common';

export interface IActiveFiltersListProps extends WithStyles<typeof styles> {
    activeValuesFilters: TActiveFilters;
    activeValuesRanges: TActiveRangeFilters;
    rangeFilters?: RangeFacets[];
    filtersLocalizedNames: IIndexSignature | null;
    rangesLocalizedNames: IIndexSignature | null;

    resetHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    deleteActiveFilterHandler: Function;
}
