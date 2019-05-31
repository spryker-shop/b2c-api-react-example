import * as React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { RangeFiltersProps as Props } from './types';
import { styles } from './styles';
import { rangeFilterValueToFront } from '@helpers/common';
import { rangeMaxType, rangeMinType } from '@constants/search';
import { SprykerRangeSlider } from '@components/UI/SprykerRangeSlider';

const RangeFiltersComponent: React.FC<Props> = (props): JSX.Element => {
    const { ranges, activeRangeFilters, updateStore, updateRangeFilters, classes, openedRanges, openFilter } = props;

    const renderRangeFilters = (): JSX.Element[] => ranges.map(filter => {
        const valueFrom = rangeFilterValueToFront(filter.min, rangeMinType);
        const valueTo = rangeFilterValueToFront(filter.max, rangeMaxType);
        const isActive = openedRanges.includes(filter);

        return (
            <Grid item xs={ 12 } md={ 4 } lg={ 3 } key={ filter.name } className={ classes.gridItem }>
                <SprykerRangeSlider
                    key={ filter.name }
                    attributeName={ filter.name }
                    title={ filter.localizedName }
                    min={ valueFrom }
                    max={ valueTo }
                    handleChange={ updateRangeFilters }
                    handleAfterChange={ updateStore }
                    classes={ {
                        popoverContent: classes.rangeFilters
                    }}
                    currentValue={ activeRangeFilters[filter.name] || {
                        min: valueFrom,
                        max: valueTo
                    }}
                    isActive={ isActive }
                    openFilter={ openFilter(filter, 'openedRanges') }
                />
            </Grid>
        );
    });

    return <>{ renderRangeFilters() }</>;
};

export const RangeFilters = withStyles(styles)(RangeFiltersComponent);
