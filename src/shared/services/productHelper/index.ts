import {
  LOCALE_DEFAULT,
} from '../../constants/Environment';

interface IAvailabilityValues {
  yes: string;
  not: string;
}

interface IAvailabilityMap {
  [key: string]: IAvailabilityValues;
}

export const getAvailabilityDisplay = (availability: boolean, locale: string = LOCALE_DEFAULT) => {

  let map;
  const availabilityMap: IAvailabilityMap = {
    'de-DE': {
      yes: 'Yes',
      not: 'No',
    },
    fallback: {
      yes: 'Yes',
      not: 'No',
    }
  };

  if (availabilityMap[locale]) {
    map = availabilityMap[locale];
  } else {
    map = availabilityMap.fallback;
  }

  if (!availability) {
    return map.not;
  }

  return map.yes;
};
