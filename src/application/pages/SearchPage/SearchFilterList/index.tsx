import * as React from 'react';
import { connect } from './connect';
import {
    ISearchFilterListProps as Props,
    ISearchFilterListState as State,
    filterTypeFilter,
    filterTypeRange,
    IFilterItemToDelete,
    rangeMaxType,
    rangeMinType,
    RangeType,
    TFilterItemValue,
    TFilterItemName
} from './types';
import { TRangeInputName } from '@application/components/UI/SprykerRangeFilter/types';
import { RangeFacets } from '@interfaces/searchPageData';
import { getFiltersLocalizedNames, getRangeFiltersLocalizedNames } from '../helpers';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import { FiltersList } from './FiltersList';
import { ActiveFiltersList } from './ActiveFiltersList';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class SearchFilterListBase extends React.Component<Props, State> {
    public readonly state: State = {
        activeFilters: this.props.activeFilters,
        activeRangeFilters: this.props.activeRangeFilters,
        isFilterUpdated: false
    };

    static getDerivedStateFromProps = (props: Props, state: State): State => {
        if (props.isLoading || state.isFilterUpdated) {
            return {
                ...state,
                isFilterUpdated: false
            };
        }

        return {
            activeFilters: props.activeFilters,
            activeRangeFilters: props.activeRangeFilters,
            isFilterUpdated: false
        };
    };

    protected updateRangeFilters = async (name: TRangeInputName, {min, max}: RangeType): Promise<void> => {
        const currentData = this.props.rangeFilters.filter((filter: RangeFacets) => (filter.name === name))[0];
        const currentDataActiveMin = rangeFilterValueToFront(currentData.activeMin, rangeMinType);
        const currentDataActiveMax = rangeFilterValueToFront(currentData.activeMax, rangeMaxType);

        if (currentDataActiveMin === min && currentDataActiveMax === max) {
            return;
        }

        await this.setState((prevState: State) => (
            {
                activeRangeFilters: {
                    ...prevState.activeRangeFilters,
                    [name]: {min, max},
                },
                isFilterUpdated: true
            }
        ));
    };

    protected updateActiveFilters = async (name: string, values: string[]): Promise<boolean> => {
        await this.setState((prevState: State) => ({
            activeFilters: {
                ...prevState.activeFilters,
                [name]: values,
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
                ...activeRanges,
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
                activeRangeFilters: {},
            }
        ));
    };

    protected resetFilterOneValue = ({name, value}: IFilterItemToDelete): void => {
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

    public render = (): JSX.Element => (
        <>
            <FiltersList
                filters={ this.props.filters }
                activeFilters={ this.state.activeFilters }
                ranges={ this.props.rangeFilters }
                activeRangeFilters={ this.state.activeRangeFilters }
                updateStore={ this.updateStoreWithNewFilters }
                updateActiveFilters={ this.updateActiveFilters }
                updateRangeFilters={ this.updateRangeFilters }
            />

            <ActiveFiltersList
                rangeFilters={ this.props.rangeFilters }
                activeValuesFilters={ this.state.activeFilters }
                activeValuesRanges={ this.state.activeRangeFilters }
                deleteActiveFilterHandler={ this.deleteActiveFilterHandler }
                filtersLocalizedNames={getFiltersLocalizedNames(this.props.filters)}
                rangesLocalizedNames={getRangeFiltersLocalizedNames(this.props.rangeFilters)}
                resetHandler={ this.runResetActiveFilters }
            />
        </>
    );
}

export const SearchFilterList = withStyles(styles)(SearchFilterListBase);
