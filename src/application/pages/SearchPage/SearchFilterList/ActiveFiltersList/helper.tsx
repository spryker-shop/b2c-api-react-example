import * as React from 'react';
import { IFilterItem, TRangeType } from '@interfaces/search';
import { filterTypeRange } from '@constants/search';
import { rangeFilterValueToBack } from '@helpers/common';
import { AppPrice } from '@components/AppPrice';

/**
 *
 * @param {boolean} isPrice
 * @param {TRangeType} value
 * @param {string} rangeName
 * @param {string} title
 * @returns {IFilterItem}
 */
export const createRangeFilterItemCombined = (
    {value, rangeName, title}:
        {
            value: TRangeType,
            rangeName: string,
            title: string,
        }):
    IFilterItem | null => {

    const label = (
        <>
            <AppPrice value={rangeFilterValueToBack(value.min)} />
            &nbsp;{'-'}&nbsp;
            <AppPrice value={rangeFilterValueToBack(value.max)} />
        </>
    );

    return {
        name: rangeName,
        value,
        label,
        type: filterTypeRange,
    };
};
