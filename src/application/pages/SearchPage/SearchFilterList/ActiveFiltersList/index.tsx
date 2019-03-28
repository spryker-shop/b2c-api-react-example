import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RangeFacets } from '@interfaces/searchPageData';
import { IActiveFiltersListProps as Props } from './types';
import { filterTypeFilter, IFilterItem, TFilterItemValue } from '../types';
import { isWordHasPrice } from '@helpers/common/transform';
import { createRangeFilterItemCombined } from './helper';
import { Grid, Chip, withStyles, Button } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { styles } from './styles';

const ActiveFiltersListComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        activeValuesFilters,
        activeValuesRanges,
        rangeFilters,
        resetHandler,
        rangesLocalizedNames,
        deleteActiveFilterHandler
    } = props;

    const isActiveRangesExist = ((Object.getOwnPropertyNames(activeValuesRanges).length > 0));
    const itemsGlobalCollection: IFilterItem[] = [];

    for (const filter in activeValuesFilters) {
        if (Array.isArray(activeValuesFilters[filter]) && activeValuesFilters[filter].length) {
            const itemsLocalCollection = activeValuesFilters[filter].map((value: TFilterItemValue) => ({
                name: filter,
                value,
                label: value.toString(),
                type: filterTypeFilter
            }));
            itemsGlobalCollection.push(...itemsLocalCollection);
        }
    }

    if (isActiveRangesExist && rangeFilters) {
        for (const rangeName in activeValuesRanges) {
            const defaultValuesArr = rangeFilters.filter((item: RangeFacets) => (item.name === rangeName));
            if (defaultValuesArr && defaultValuesArr[0]) {

                let isPrice = false;
                if (isWordHasPrice(rangeName)) {
                    isPrice = true;
                }
                const valueFrom = activeValuesRanges[rangeName].min;
                const valueTo = activeValuesRanges[rangeName].max;

                if (valueFrom >= 0 && valueTo >= 0) {
                    itemsGlobalCollection.push(
                        createRangeFilterItemCombined({
                            isPrice,
                            value: activeValuesRanges[rangeName],
                            rangeName,
                            title: (rangesLocalizedNames && rangesLocalizedNames[rangeName])
                                ? rangesLocalizedNames[rangeName]
                                : ''
                        })
                    );
                }
            }
        }
    }

    const isActiveGlobalCollectionExist = itemsGlobalCollection.length > 0;

    if (!isActiveGlobalCollectionExist) {
        return null;
    }

    return (
        <div className={ classes.filterList }>
            <Grid container alignItems="center" spacing={ 8 }>
                { itemsGlobalCollection.map((item: IFilterItem) => {
                    const { name, value, label, type, rangeSubType } = item;
                    const itemKey = `${name}-${value}${rangeSubType ? rangeSubType : ''}`;

                    return (
                        <Grid item key={ itemKey }>
                            <Chip
                                label={ label }
                                variant="outlined"
                                onDelete={ deleteActiveFilterHandler({ name, value, type, rangeSubType }) }
                                deleteIcon={
                                    <span className={ classes.iconOverlay }>
                                        <span className={ classes.iconInner }>
                                            <CloseOutlined className={ classes.icon } />
                                        </span>
                                    </span>
                                }
                                className={ classes.chip }
                                classes={ { label: classes.label } }
                            />
                        </Grid>
                    );
                }) }
                <Grid item>
                    <Button className={ classes.resetBtn } variant="text" onClick={ resetHandler }>
                        <FormattedMessage id={ 'reset.all.filters.title' } />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export const ActiveFiltersList = withStyles(styles)(ActiveFiltersListComponent);
