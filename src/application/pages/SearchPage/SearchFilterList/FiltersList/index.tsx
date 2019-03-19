import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFiltersListProps as Props } from './types';
import { rangeMaxType, rangeMinType } from '../types';
import { ValueFacets } from '@interfaces/searchPageData';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import { AppPageSubTitle } from '@application/components/AppPageSubTitle';
import { SprykerFilterElement } from '@application/components/UI/SprykerFilter';
import { SprykerRangeSlider } from '@application/components/UI/SprykerRangeSlider';
import { AppPrice } from '@application/components//AppPrice';
import { FilterWrapper } from './FilterWrapper';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { sprykerTheme } from '@theme/sprykerTheme';

export const FiltersListBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        filters,
        activeFilters,
        ranges,
        activeRangeFilters,
        updateStore,
        updateActiveFilters,
        updateRangeFilters
    } = props;
    const priceMultiplier = 100;

    const priceValueFormatter = (value: number) => (
        <AppPrice value={ value * priceMultiplier } extraClassName={ classes.priceClassName } />
    );

    const renderFilters = (): JSX.Element[] => {
        const filterItems: JSX.Element[] = [];

        if (Array.isArray(filters)) {
            filters.forEach((filter: ValueFacets) => {
                const isFilterItemsExist = Array.isArray(filter.values) && filter.values.length;

                if (isFilterItemsExist) {
                    filterItems.push(
                        <FilterWrapper
                            filter={
                                <SprykerFilterElement
                                    attributeName={ filter.name }
                                    menuItems={ filter.values }
                                    activeValues={ activeFilters[filter.name] || [] }
                                    handleChange={ updateActiveFilters }
                                    extraClassName={ classes.filter }
                                    isShowSelected={ false }
                                    handleClose={ updateStore }
                                    title={ filter.localizedName }
                                />
                            }
                            keyValue={ filter.name }
                            key={ filter.name }
                        />
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
                    <FilterWrapper
                        filter={
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
                                valueFormatter={ filter.name.includes('price') ? priceValueFormatter : null }
                            />
                        }
                        keyValue={ filter.name }
                        key={ filter.name }
                    />
                );
            });
        }

        return rangeItems;
    };

    const isFiltersExist = Boolean(renderFilters().length);
    const isRangeExist = Boolean(renderRange().length);
    const isItemsExist = isFiltersExist || isRangeExist;

    return (
        <Grid container justify="flex-start" alignItems="center" className={ classes.root }>
            { isItemsExist &&
                <Grid item xs={ 12 }>
                    <AppPageSubTitle
                    title={ <FormattedMessage id={ 'category.results.filter.title' } /> }
                    />
                </Grid>
            }
            <Grid container alignItems="flex-start" spacing={ sprykerTheme.appFixedDimensions.gridSpacing }>
                { isFiltersExist && renderFilters() }
                { isItemsExist &&  renderRange()}
            </Grid>
        </Grid>
    );
};

export const FiltersList = withStyles(styles)(FiltersListBase);
