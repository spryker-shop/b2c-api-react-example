import {ISearchPageData, RangeFacets} from "src/shared/interfaces/searchPageData/index";
import {rangeFilterValueToFront} from "src/shared/helpers/common/transform";
import {rangeMaxType, rangeMinType, TActiveRangeFilters} from "src/shared/components/Pages/SearchPage/types";

export const isValidRangeInput = (activeRanges: TActiveRangeFilters,
                                  defaultRanges: ISearchPageData["rangeFilters"]): boolean => {
  const activeData: {[key: string]: any} = {...activeRanges};
  const defaultData = [...defaultRanges];
  let canMakeNewRequest: boolean = true;

  defaultData.forEach((filter: RangeFacets) => {
    if (activeData[filter.name]) {
      const defaultMin = rangeFilterValueToFront(filter.min, rangeMinType);
      const defaultMax = rangeFilterValueToFront(filter.max, rangeMaxType);

      for (let prop in activeData[filter.name]) {
        if (activeData[filter.name][prop] < defaultMin
          || activeData[filter.name][prop] > defaultMax
        ) {
          canMakeNewRequest = false;
        }
      }
    }
  });
  return canMakeNewRequest;
};