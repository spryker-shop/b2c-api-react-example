import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';
import {
    filterTypeFilter,
    IFilterItem,
    TFilterItemValue,
} from '@application/pages/SearchPage/types';
import { ActiveFilterItem } from '@application/pages/SearchPage/ActiveFilterItem';
import { AppPageSubTitle } from '@application/components/AppPageSubTitle';
import { isWordHasPrice } from '@helpers/common/transform';
import { RangeFacets } from '@interfaces/searchPageData';
import {
    createRangeFilterItemCombined,
} from '@application/pages/SearchPage/ActiveFiltersList/helper';
import { IActiveFiltersListProps } from '@application/pages/SearchPage/ActiveFiltersList/types';
import { FormattedMessage } from 'react-intl';

export const ActiveFiltersListBase: React.SFC<IActiveFiltersListProps> = props => {
    const {
        classes,
        activeValuesFilters,
        activeValuesRanges,
        rangeFilters,
        resetHandler,
        filtersLocalizedNames,
        rangesLocalizedNames,
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
                            <ActiveFilterItem
                                key={ itemKey }
                                value={item.value}
                                name={item.name}
                                label={item.label}
                                type={item.type}
                                rangeSubType={item.rangeSubType}
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
