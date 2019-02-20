import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RangeFacets } from '@interfaces/searchPageData';
import { IActiveFiltersListProps } from './types';
import { filterTypeFilter, IFilterItem, TFilterItemValue } from '../types';
import { AppPageSubTitle } from '@components/Common/AppPageSubTitle';
import { isWordHasPrice } from '@helpers/common/transform';
import { createRangeFilterItemCombined } from './helper';
import { Grid, Chip, withStyles } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { styles } from './styles';

export const ActiveFiltersListBase: React.SFC<IActiveFiltersListProps> = props => {
    const {
        classes,
        activeValuesFilters,
        activeValuesRanges,
        rangeFilters,
        resetHandler,
        filtersLocalizedNames,
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
                label: `${(filtersLocalizedNames && filtersLocalizedNames[filter])
                    ? filtersLocalizedNames[filter]
                    : ''}: ${value}`,
                type: filterTypeFilter,
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

                if (valueFrom > 0 && valueTo > 0) {
                    itemsGlobalCollection.push(
                        createRangeFilterItemCombined({
                            isPrice,
                            value: activeValuesRanges[rangeName],
                            rangeName,
                            title: (rangesLocalizedNames && rangesLocalizedNames[rangeName])
                                ? rangesLocalizedNames[rangeName]
                                : '',
                            priceClassName: classes.price
                        }),
                    );
                }
            }
        }
    }

    const isActiveGlobalCollectionExist = (itemsGlobalCollection.length > 0);

    if (!isActiveGlobalCollectionExist) {
        return null;
    }

    return (
        <Grid container
              justify="flex-start"
              alignItems="center"
              className={classes.root}
        >
            <Grid item xs={12}>
                <AppPageSubTitle title={<FormattedMessage id={ 'active.filters.title' } />}/>
            </Grid>

            <Grid container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.list}
            >
                {
                    itemsGlobalCollection.map((item: IFilterItem) => {
                        const itemKey = `${item.name}-${item.value}${item.rangeSubType ? item.rangeSubType : ''}`;

                        return (
                            <Chip
                                key={itemKey}
                                label={item.label}
                                variant="outlined"
                                onDelete={deleteActiveFilterHandler(
                                    {
                                        name: item.name,
                                        value: item.value,
                                        type: item.type,
                                        rangeSubType: item.rangeSubType
                                    }
                                )}
                                deleteIcon={<CloseOutlined className={classes.close}/>}
                                className={classes.chip}
                                classes={{label: classes.label}}
                            />
                        );
                    })
                }
                <Chip
                    label={<FormattedMessage id={ 'reset.all.filters.title' } />}
                    className={`${classes.reset}`}
                    onClick={resetHandler}
                    classes={{label: classes.resetLabel}}
                />
            </Grid>
        </Grid>
    );
};

export const ActiveFiltersList = withStyles(styles)(ActiveFiltersListBase);
