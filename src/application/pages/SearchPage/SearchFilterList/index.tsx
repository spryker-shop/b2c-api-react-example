import * as React from 'react';
import { connect } from './connect';
import {
    ISearchFilterListProps as Props,
    ISearchFilterListState as State,
    filterTypeFilter,
    filterTypeRange,
    IFilterItemToDelete,
    RangeType,
    TFilterItemValue,
    TFilterItemName
} from './types';
import { TSprykerRangeSliderName } from '@application/components/UI/SprykerRangeSlider/types';
import { getFiltersLocalizedNames, getRangeFiltersLocalizedNames } from '../helpers';
import { FiltersList } from './FiltersList';
import { ActiveFiltersList } from './ActiveFiltersList';
import { Button, Hidden, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { FiltersIcon } from './icons';
import { FormattedMessage } from 'react-intl';

@connect
class SearchFilterListComponent extends React.Component<Props, State> {
    public readonly state: State = {
        activeFilters: this.props.activeFilters,
        activeRangeFilters: this.props.activeRangeFilters,
        isFilterUpdated: false,
        isFirstLoadPassed: null,
        isFilterListOpened: false
    };

    static getDerivedStateFromProps = (props: Props, state: State): State => {
        if (props.isFulfilled && state.isFirstLoadPassed === null) {
            return {
                ...state,
                isFirstLoadPassed: true,
                activeFilters: props.activeFilters,
                activeRangeFilters: props.activeRangeFilters,
                isFilterUpdated: false
            };
        }

        if (props.isLoading || state.isFilterUpdated) {
            return {
                ...state,
                isFilterUpdated: false,
            };
        }

        return {
            ...state,
            activeFilters: props.activeFilters,
            activeRangeFilters: props.activeRangeFilters,
            isFilterUpdated: false
        };
    };

    protected updateRangeFilters = async (name: TSprykerRangeSliderName, { min, max }: RangeType): Promise<void> => {
        await this.setState((prevState: State) => (
            {
                activeRangeFilters: {
                    ...prevState.activeRangeFilters,
                    [name]: { min, max }
                },
                isFilterUpdated: true
            }
        ));
    };

    protected updateActiveFilters = async (name: string, values: string[]): Promise<boolean> => {
        await this.setState((prevState: State) => ({
            activeFilters: {
                ...prevState.activeFilters,
                [name]: values
            },
            isFilterUpdated: true
        }));

        return true;
    };

    protected resetRangeFilter = ({ name }: IFilterItemToDelete): void => {
        if (!name) {
            return;
        }

        const updatedState: Promise<boolean> = this.deleteRangeFilter(name);

        updatedState.then(this.updateStoreWithNewFilters);
    };

    protected deleteRangeFilter = async (name: TFilterItemName): Promise<boolean> => {
        const { ...activeRanges } = this.state.activeRangeFilters;
        delete activeRanges[name];

        await this.setState({
            activeRangeFilters: {
                ...activeRanges
            },
            isFilterUpdated: true
        });

        return true;
    };

    protected runResetActiveFilters = async (): Promise<void> => {
        this.props.clearActiveFilters();
        await this.setState((prevState: State) => (
            {
                ...prevState,
                activeFilters: {},
                activeRangeFilters: {}
            }
        ));
    };

    protected resetFilterOneValue = ({ name, value }: IFilterItemToDelete): void => {
        const values = [...this.state.activeFilters[name]].filter((val: TFilterItemValue) => val !== value);
        const stateUpdated: Promise<boolean> = this.updateActiveFilters(name, values);

        stateUpdated.then(this.updateStoreWithNewFilters);
    };

    protected updateStoreWithNewFilters = (): void => {
        const isActiveFiltersChanged = this.state.activeFilters !== this.props.activeFilters;
        const isactiveRangeFiltersChanged = this.state.activeRangeFilters !== this.props.activeRangeFilters;

        if (isActiveFiltersChanged || isactiveRangeFiltersChanged) {
            this.props.setActiveFilters({
                activeFilters: this.state.activeFilters,
                activeRangeFilters: this.state.activeRangeFilters
            });
        }
    };

    protected deleteActiveFilterHandler = (itemToDelete: IFilterItemToDelete) => (): void => {
        if (itemToDelete.type === filterTypeFilter) {
            this.resetFilterOneValue(itemToDelete);
        } else if (itemToDelete.type === filterTypeRange) {
            this.resetRangeFilter(itemToDelete);
        }
    };

    protected onFiltersChangeStateHandle = (isFilterListOpened: boolean): void => {
        const { isLockedPage } = this.props;

        isLockedPage(isFilterListOpened);
        this.setState(({isFilterListOpened}));
    };

    public render = (): JSX.Element => {
        const { classes, filters, rangeFilters, categoriesList } = this.props;
        const { activeFilters, activeRangeFilters, isFirstLoadPassed, isFilterListOpened } = this.state;

        return (
            <>
                { isFirstLoadPassed &&
                    <div className={ classes.root }>
                        <Hidden lgUp>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={ () => this.onFiltersChangeStateHandle(!isFilterListOpened) }
                                className={`${classes.button} ${isFilterListOpened ? classes.buttonActive : ''}`}
                            >
                                <span className={ classes.buttonIcon }>
                                    <FiltersIcon />
                                </span>
                                <FormattedMessage
                                    id={`${isFilterListOpened ? 'hide.filters.title' : 'word.filters.title'}`}
                                />
                            </Button>
                        </Hidden>

                        <div
                            className={`${classes.filtersHolder} ${isFilterListOpened ? classes.filtersOpen : ''}`}
                        >
                            <FiltersList
                                filters={ filters }
                                activeFilters={ activeFilters }
                                ranges={ rangeFilters }
                                activeRangeFilters={ activeRangeFilters }
                                updateStore={ this.updateStoreWithNewFilters }
                                updateActiveFilters={ this.updateActiveFilters }
                                updateRangeFilters={ this.updateRangeFilters }
                                changeWrapperState={ this.onFiltersChangeStateHandle }
                                categoriesList={ categoriesList }
                            />
                        </div>

                        <div
                            className={`${classes.activeFiltersHolder} ${isFilterListOpened ? '' : classes.activeOpen}`}
                        >
                            <ActiveFiltersList
                                rangeFilters={ rangeFilters }
                                activeValuesFilters={ activeFilters }
                                activeValuesRanges={ activeRangeFilters }
                                deleteActiveFilterHandler={ this.deleteActiveFilterHandler }
                                filtersLocalizedNames={ getFiltersLocalizedNames(filters) }
                                rangesLocalizedNames={ getRangeFiltersLocalizedNames(rangeFilters) }
                                resetHandler={ this.runResetActiveFilters }
                            />
                        </div>
                    </div>
                }
            </>
        );
    };
}

export const SearchFilterList = withStyles(styles)(SearchFilterListComponent);
