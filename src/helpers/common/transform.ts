import { rangeMaxType, rangeMinType, TRangeType } from '@pages/SearchPage/SearchFilterList/types';

export const firstLetterToUpperCase = (word: string): string | null => {
    if (!word) {
        return null;
    }

    let title: string;
    const possibleSeparators = ['-', '_'];
    const separator = possibleSeparators.filter((item: string) => {
        if (word.indexOf(item) > -1) {
            return item;
        }
    });

    if (separator && separator.length) {
        const wordParts = word.split(separator[0]);
        title = (wordParts.length > 1) ? wordParts[0] : word;
    } else {
        title = word;
    }

    return title.charAt(0).toUpperCase() + title.slice(1);
};

export const isWordHasPrice = (word: string): boolean => {
    if (!word) {
        return false;
    }

    if (word.toLowerCase().indexOf('price') !== -1) {
        return true;
    }

    return false;
};

export const rangeFilterValueToFront = (value: number, type: TRangeType): number => {
    const valueFixed = (value / 100);

    if (type === rangeMinType) {
        return Math.floor(valueFixed);
    } else {
        if (type === rangeMaxType) {
            return Math.ceil(valueFixed);
        }
    }

    return 0;
};

export const rangeFilterValueToBack = (value: number): number => {
    if (!value) {
        return 0;
    }

    return value * 100;
};
