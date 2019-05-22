import * as React from 'react';
import { IFilterItem, TRangeType } from '@interfaces/search';
import { filterTypeRange } from '@constants/search';
import { rangeFilterValueToBack } from '@helpers/common/transform';
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
    {isPrice, value, rangeName, title}:
        {
            isPrice: boolean,
            value: TRangeType,
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
