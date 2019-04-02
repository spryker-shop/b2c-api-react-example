import * as React from 'react';
import { IFiltersListProps as Props } from './types';
import { rangeMaxType, rangeMinType } from '../types';
import { ValueFacets } from '@interfaces/searchPageData';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import { SprykerFilter } from '@application/components/UI/SprykerFilter';
import { SprykerRangeSlider } from '@application/components/UI/SprykerRangeSlider';
import { Grid, withStyles, Hidden, Button } from '@material-ui/core';
import { styles } from './styles';
import { FiltersIcon, CrossIcon } from './icons';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { pathCheckoutPage } from '@constants/routes';

const FiltersListComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        filters,
        activeFilters,
        ranges,
        activeRangeFilters,
        updateStore,
        updateActiveFilters,
        updateRangeFilters,
        classes,
        categoriesList
    } = props;

    const renderFilters = (): JSX.Element[] => {
        const filterItems: JSX.Element[] = [];

        if (Array.isArray(filters)) {
            filters.forEach((filter: ValueFacets) => {
                const isFilterItemsExist = Array.isArray(filter.values) && filter.values.length;

                if (isFilterItemsExist) {
                    filterItems.push(
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 } key={ filter.name }>
                            <SprykerFilter
                                attributeName={ filter.name }
                                menuItems={ filter.values }
                                activeValues={ activeFilters[filter.name] || [] }
                                handleChange={ updateActiveFilters }
                                isShowSelected
                                handleClose={ updateStore }
                                title={ filter.localizedName }
                                classes={{
                                    iconOpened: classes.filterChevronOpened,
                                    icon: classes.filterChevron,
                                    modalRootOpened: classes.filtersModalRootOpened,
                                    modalRoot: classes.filtersModalRoot,
                                    menu: classes.filters
                                }}
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
                    <Grid item xs={ 12 } md={ 4 } lg={ 3 } key={ filter.name }>
                        <SprykerRangeSlider
                            key={ filter.name }
                            attributeName={ filter.name }
                            title={ filter.localizedName }
                            min={ valueFrom }
                            max={ valueTo }
                            handleChange={ updateRangeFilters }
                            handleAfterChange={ updateStore }
                            classes={{
                                popoverContent: classes.filters
                            }}
                            currentValue={ activeRangeFilters[filter.name] || {
                                min: valueFrom,
                                max: valueTo
                            }}
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
        <div className={ classes.wrapper }>
            <Hidden mdUp>
                <div className={ classes.heading }>
                    <span className={ classes.filterIcon }>
                        <FiltersIcon />
                    </span>
                    <span className={ classes.title }>
                        <FormattedMessage id={ 'word.filters.title' } />
                    </span>

                    <span className={ classes.close }>
                        <span className={ classes.closeIcon }>
                            <CrossIcon />
                        </span>
                    </span>
                </div>
            </Hidden>
            { isItemsExist &&
                <div className={ classes.filterList }>
                    <Grid container spacing={ 16 }>
                        <Hidden lgUp>
                            <Grid item xs={ 12 } md={ 4 } className={ classes.categoriesList }>
                                { categoriesList }
                            </Grid>
                        </Hidden>
                        { isFiltersExist && renderFilters() }
                        { isItemsExist &&  renderRange()}
                    </Grid>
                </div>
            }
            <Hidden mdUp>
                <div className={ classes.apply }>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        <FormattedMessage id={ 'word.apply.title' } />
                    </Button>
                </div>
            </Hidden>
        </div>

    );
};

export const FiltersList = withStyles(styles)(FiltersListComponent);
