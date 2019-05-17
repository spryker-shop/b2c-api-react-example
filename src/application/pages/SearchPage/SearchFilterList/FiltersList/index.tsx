import * as React from 'react';
import { connect } from './connect';
import { IFiltersListProps as Props, IFiltersListState as State } from './types';
import { RangeFacets, ValueFacets } from '@interfaces/searchPageData';
import { Grid, withStyles, Hidden, Button, withWidth } from '@material-ui/core';
import { styles } from './styles';
import { FiltersIcon, CrossIcon, ChevronIcon } from './icons';
import { FormattedMessage } from 'react-intl';
import { ClickEvent } from '@interfaces/common';
import { AttributeFilters } from './AttributeFilters';
import { RangeFilters } from './RangeFilters';
import { withRouter } from 'react-router';
import { pathCategoryPageBase } from '@constants/routes';

@(withRouter as Function)
@connect
class FiltersListComponent extends React.Component<Props, State> {
    public readonly state: State = {
        openedFilters: [],
        openedRanges: [],
        openedCategories: false,
        selectedMobileCategoryId: null
    };

    public componentDidMount = (): void => this.setState({ selectedMobileCategoryId: this.props.currentCategoryId });

    public componentDidUpdate = (prevProps: Props): void => {
        const { location } = this.props;

        if (location.pathname !== prevProps.location.pathname) {
            this.onCloseFiltersHandler();
        }
    };

    protected onCategoryItemClickHandler = (cattegoryId: number): void =>
        this.setState({ selectedMobileCategoryId: cattegoryId });

    protected handleOpenFilters = (filter: ValueFacets | RangeFacets, filtersName: string) =>
        (event: ClickEvent): void => {
        event.preventDefault();
        const filters = this.state[filtersName] as (ValueFacets | RangeFacets)[];
        const isFilterOpened = filters.includes(filter);

        if (isFilterOpened) {
            const removeFilterFromList = filters
                .filter((filterItem: ValueFacets | RangeFacets) => filterItem !== filter);

            this.setState({ ...this.state, [filtersName]: removeFilterFromList });

            return;
        }

        const openedFiltersList = [...filters, filter];

        this.setState({ ...this.state, [filtersName]: openedFiltersList });
    };

    protected filterRangeFilters = (): RangeFacets[] => {
        const { ranges } = this.props;
        const isRangeExist = Array.isArray(ranges) && ranges.length;

        if (!isRangeExist) {
            return null;
        }

        return ranges.filter(item => (
            item.min !== 0 && item.max !== 0 && item.name !== 'rating'
        ));
    };

    protected onCategoriesTitleClickHandler = (): void =>
        this.setState(({openedCategories}) => ({ openedCategories: !openedCategories }));

    protected onCloseFiltersHandler = (): void => {
        const { changeWrapperState, currentCategoryId } = this.props;

        changeWrapperState(false);
        this.setState({
            openedFilters: [],
            openedCategories: false,
            openedRanges: [],
            selectedMobileCategoryId:
            currentCategoryId
        });
    };

    protected applyFilters = (): void => {
        const { updateStore, setCurrentCategory, changeLocation } = this.props;
        const { selectedMobileCategoryId } = this.state;

        this.onCloseFiltersHandler();
        setCurrentCategory(selectedMobileCategoryId);
        changeLocation(`${pathCategoryPageBase}/${selectedMobileCategoryId}`);
        updateStore();
    };

    public render = (): JSX.Element => {
        const {
            classes,
            categoriesList,
            filters,
            activeFilters,
            updateStore,
            updateActiveFilters,
            width,
            activeRangeFilters,
            updateRangeFilters
        } = this.props;
        const { openedFilters, openedCategories, openedRanges, selectedMobileCategoryId } = this.state;

        const isFiltersExist = Array.isArray(filters) && filters.length;
        const isRangeExist = Boolean(this.filterRangeFilters()) && this.filterRangeFilters().length;
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
                        <span className={ classes.close } onClick={ this.onCloseFiltersHandler }>
                            <span className={ classes.closeIcon }><CrossIcon /></span>
                        </span>
                    </div>
                </Hidden>
                { isItemsExist &&
                <div className={ classes.filterList }>
                    <Grid container className={ classes.gridList }>
                        <Hidden lgUp>
                            <Grid item xs={ 12 } md={ 4 } className={`${classes.categoriesList} ${classes.gridItem}`}>
                                { categoriesList(
                                        openedCategories,
                                        this.onCategoriesTitleClickHandler,
                                        selectedMobileCategoryId,
                                        this.onCategoryItemClickHandler
                                    )
                                }
                            </Grid>
                        </Hidden>
                        { isFiltersExist &&
                            <AttributeFilters
                                filters={ filters }
                                activeFilters={ activeFilters }
                                width={ width }
                                updateStore={ updateStore }
                                updateActiveFilters={ updateActiveFilters }
                                openedFilters={ openedFilters }
                                openFilter={ this.handleOpenFilters }
                                classes={{ gridItem: classes.gridItem }}
                                icon={ <ChevronIcon /> }
                            />
                        }
                        { isItemsExist &&
                            <RangeFilters
                                ranges={ this.filterRangeFilters() }
                                updateStore={ updateStore }
                                activeRangeFilters={ activeRangeFilters }
                                updateRangeFilters={ updateRangeFilters }
                                classes={{ gridItem: classes.gridItem }}
                                openedRanges={ openedRanges }
                                openFilter={ this.handleOpenFilters }
                            />
                        }
                    </Grid>
                </div>
                }
                <Hidden mdUp>
                    <div className={ classes.apply }>
                        <Button variant="contained" color="primary" fullWidth onClick={ this.applyFilters }>
                            <FormattedMessage id={ 'word.apply.title' } />
                        </Button>
                    </div>
                </Hidden>
            </div>

        );
    };
}

export const FiltersList = withWidth()(withStyles(styles)(FiltersListComponent));
