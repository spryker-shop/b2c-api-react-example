import * as React from 'react';
import { IFiltersListProps as Props } from './types';
import { rangeMaxType, rangeMinType } from '../types';
import { ValueFacets } from '@interfaces/searchPageData';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import { SprykerFilter } from '@application/components/UI/SprykerFilter';
import { SprykerRangeSlider } from '@application/components/UI/SprykerRangeSlider';
import { AppPrice } from '@application/components//AppPrice';
import { Grid } from '@material-ui/core';

export const FiltersList: React.SFC<Props> = (props): JSX.Element => {
    const {
        filters,
        activeFilters,
        ranges,
        activeRangeFilters,
        updateStore,
        updateActiveFilters,
        updateRangeFilters
    } = props;

    const renderFilters = (): JSX.Element[] => {
        const filterItems: JSX.Element[] = [];

        if (Array.isArray(filters)) {
            filters.forEach((filter: ValueFacets) => {
                const isFilterItemsExist = Array.isArray(filter.values) && filter.values.length;

                if (isFilterItemsExist) {
                    filterItems.push(
                        <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ filter.name }>
                            <SprykerFilter
                                attributeName={ filter.name }
                                menuItems={ filter.values }
                                activeValues={ activeFilters[filter.name] || [] }
                                handleChange={ updateActiveFilters }
                                isShowSelected
                                handleClose={ updateStore }
                                title={ filter.localizedName }
                                isFullWidth
                            />
                        </Grid>
                    );
                }
            });
        }

        return filterItems;
    };

    const renderRange = (): JSX.Element[] => {
        const rangeItems: JSX.Element[] | null = [];

        if (Array.isArray(ranges)) {
            ranges.filter(item => (
                item.min !== 0 && item.max !== 0 && item.name !== 'rating' // rating filter temporary hidden
            )).forEach(filter => {
                const valueFrom = rangeFilterValueToFront(filter.min, rangeMinType);
                const valueTo = rangeFilterValueToFront(filter.max, rangeMaxType);

                rangeItems.push (
                    <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ filter.name }>
                        <SprykerRangeSlider
                            key={ filter.name }
                            attributeName={ filter.name }
                            title={ filter.localizedName }
                            min={ valueFrom }
                            max={ valueTo }
                            handleChange={ updateRangeFilters }
                            handleAfterChange={ updateStore }
                            currentValue={ activeRangeFilters[filter.name] || {
                                min: valueFrom,
                                max: valueTo
                            } }
                        />
                    </Grid>
                );
            });
        }

        return rangeItems;
    };

    const isFiltersExist = Boolean(renderFilters().length);
    const isRangeExist = Boolean(renderRange().length);
    const isItemsExist = isFiltersExist || isRangeExist;

    return (
        <>
            { isItemsExist &&
                <Grid container spacing={ 16 }>
                    { isFiltersExist && renderFilters() }
                    { isItemsExist &&  renderRange()}
                </Grid>
            }
        </>

    );
};
