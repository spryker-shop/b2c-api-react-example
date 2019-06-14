import { TRangesType } from '@interfaces/search';
import { rangeMaxType, rangeMinType } from '@constants/search';

export const rangeFilterValueToFront = (value: number, type: TRangesType): number => {
    const valueFixed: number = value / 100;

    if (type === rangeMinType) {
        return Math.floor(valueFixed);
    }

    if (type === rangeMaxType) {
        return Math.ceil(valueFixed);
    }

    return 0;
};

export const rangeFilterValueToBack = (value: number): number => {
    if (!value) {
        return 0;
    }

    return value * 100;
};
