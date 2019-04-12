import * as React from 'react';
import { filterTypeRange, IFilterItem, RangeType } from '../types';
import { rangeFilterValueToBack } from '@helpers/common/transform';
import { AppPrice } from '@application/components/AppPrice';

/**
 *
 * @param {boolean} isPrice
 * @param {RangeType} value
 * @param {string} rangeName
 * @param {string} title
 * @returns {IFilterItem}
 */
export const createRangeFilterItemCombined = (
    {isPrice, value, rangeName, title}:
        {
            isPrice: boolean,
            value: RangeType,
            rangeName: string,
            title: string,
        }):
    IFilterItem | null => {
    let label = null;

    if (isPrice) {
        label = (
            <>
                <AppPrice value={rangeFilterValueToBack(value.min)} />
                &nbsp;{'-'}&nbsp;
                <AppPrice value={rangeFilterValueToBack(value.max)} />
            </>
        );
    } else {
        label = `${value.min} - ${value.max}`;
    }

    return {
        name: rangeName,
        value,
        label,
        type: filterTypeRange,
    };
};
