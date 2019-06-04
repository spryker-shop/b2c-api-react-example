import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IActiveFiltersListProps as Props } from './types';
import { IFilterItem, TFilterItemValue, IRangeFacets } from '@interfaces/search';
import { filterTypeFilter, filterTypeRange } from '@constants/search';
import { Grid, Chip, withStyles, Button } from '@material-ui/core';
import { CloseOutlinedIcon } from './icons';
import { styles } from './styles';
import { Price } from '@components/Price';
import { rangeFilterValueToBack } from '@helpers/common';

const ActiveFiltersListComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        activeValuesFilters,
        activeValuesRanges,
        rangeFilters,
        resetHandler,
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
            const defaultValuesArr = rangeFilters.filter((item: IRangeFacets) => (item.name === rangeName));
            if (defaultValuesArr && defaultValuesArr[0]) {

                const valueFrom = activeValuesRanges[rangeName].min;
                const valueTo = activeValuesRanges[rangeName].max;

                if (valueFrom >= 0 && valueTo >= 0) {
                    itemsGlobalCollection.push({
                        name: rangeName,
                        value: activeValuesRanges[rangeName],
                        type: filterTypeRange,
                        label: (
                            <>
                                <Price value={ rangeFilterValueToBack(valueFrom) } />
                                &nbsp;{'-'}&nbsp;
                                <Price value={ rangeFilterValueToBack(valueTo) } />
                            </>
                        )
                    });
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
                                            <CloseOutlinedIcon />
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
