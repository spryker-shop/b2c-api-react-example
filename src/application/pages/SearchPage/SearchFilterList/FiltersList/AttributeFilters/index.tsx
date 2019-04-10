import * as React from 'react';
import { ValueFacets } from '@interfaces/searchPageData';
import { Grid, Hidden, withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { SprykerFilter } from '@components/UI/SprykerFilter';
import { isWidthUp } from '@material-ui/core/withWidth';
import { AttributeFiltersProps as Props } from './types';
import { styles } from './styles';

const AttributeFiltersComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        filters,
        activeFilters,
        updateStore,
        updateActiveFilters,
        classes,
        width,
        openFilter,
        openedFilters,
        icon
    } = props;

    const renderFilterItems = (): JSX.Element[] => filters.map((filter: ValueFacets) => {
        const isFilterItemsExist = Array.isArray(filter.values) && filter.values.length;

        if (isFilterItemsExist) {
            const isActive = openedFilters.includes(filter);
            const currentActiveFilters = activeFilters[filter.name] || [];

            return (
                <Grid item xs={ 12 } md={ 4 } lg={ 3 } key={ filter.name } className={ classes.gridItem }>
                    <Hidden mdUp>
                        <span className={ classes.filterWrapTitle } onClick={ openFilter(filter, 'openedFilters') }>
                            { filter.name.split('_').join(' ') }
                            { Boolean(currentActiveFilters.length) &&
                            <span className={ classes.counterTitle }>
                                    {`${currentActiveFilters.length} `}
                                <FormattedMessage id={'word.selected.title'} />
                                </span>
                            }
                            <span className={`
                                ${classes.filterChevron}
                                ${isActive ? classes.filterChevronOpened : ''}
                            `}>
                                { icon }
                            </span>
                        </span>
                    </Hidden>

                    <div className={ `${ classes.filterWrap } ${ isActive ? classes.filterWrapOpened : '' }` }>
                        <SprykerFilter
                            attributeName={ filter.name }
                            menuItems={ filter.values }
                            activeValues={ currentActiveFilters }
                            handleChange={ updateActiveFilters }
                            hideBackdrop={ !isWidthUp('md', width) }
                            isShowSelected
                            handleClose={ updateStore }
                            title={ filter.localizedName }
                            classes={{
                                icon: classes.selectChevron,
                                modalRoot: classes.filtersModalRoot,
                                menu: classes.filters,
                                input: classes.filterInput
                            }}
                            isFullWidth
                        />
                    </div>
                </Grid>
            );
        }
    });

    return <>{ renderFilterItems() }</>;
};

export const AttributeFilters = withStyles(styles)(AttributeFiltersComponent);
