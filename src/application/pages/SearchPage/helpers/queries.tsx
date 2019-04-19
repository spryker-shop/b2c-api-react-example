import { ISearchQuery } from '@interfaces/searchPageData';
import { TActiveRangeFilters } from '@application/pages/SearchPage/SearchFilterList/types';

export const addToQueryActiveRangeFilters = (activeRangeFilters: TActiveRangeFilters): ISearchQuery => {
    const query: { [key: string]: number | string } = {};

    Object.keys(activeRangeFilters).forEach((key: string) => {
        query[`${key.includes('price') ? 'price' : key}[min]`] = activeRangeFilters[key].min;
        query[`${key.includes('price') ? 'price' : key}[max]`] = activeRangeFilters[key].max;
    });

    return query;
};
