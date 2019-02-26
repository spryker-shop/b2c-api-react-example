import * as React from 'react';
import {
    rangeFilterValueToBack,
} from '@helpers/common/transform';
import { AppPrice } from '@application/components/AppPrice';
import {
    filterTypeRange,
    IFilterItem,
    RangeType,
} from '@application/pages/SearchPage/types';

/**
 *
 * @param {boolean} isPrice
 * @param {RangeType} value
 * @param {string} rangeName
 * @param {string} title
 * @param {string} priceClassName
 * @returns {IFilterItem}
 */
export const createRangeFilterItemCombined = (
    {isPrice, value, rangeName, title, priceClassName}:
    {
      isPrice: boolean,
      value: RangeType,
      rangeName: string,
      title: string,
      priceClassName: string | null
    }):
    IFilterItem | null => {
    let label = null;

    if (isPrice) {
        label = (
            <React.Fragment>
                {`${title}:`}&nbsp;
                <AppPrice
                    value={rangeFilterValueToBack(value.min)}
                    extraClassName={priceClassName}
                />
                &nbsp;{'-'}&nbsp;
                <AppPrice
                    value={rangeFilterValueToBack(value.max)}
                    extraClassName={priceClassName}
                />
            </React.Fragment>
        );
    } else {
        label = `${title}: ${value.min} - ${value.max}`;
    }

    return {
        name: rangeName,
        value,
        label,
        type: filterTypeRange,
    };
};
