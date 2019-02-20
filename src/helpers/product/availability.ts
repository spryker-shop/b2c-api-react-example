import { APP_LOCALE_DEFAULT } from '@configs/environment';

interface IAvailabilityValues {
    yes: string;
    not: string;
}

interface IAvailabilityMap {
    [key: string]: IAvailabilityValues;
}

export const getAvailabilityDisplay = (availability: boolean, locale: string = APP_LOCALE_DEFAULT) => {
    let map;
    const availabilityMap: IAvailabilityMap = {
        'de': {
            yes: 'Available',
            not: 'Unavailable',
        },
        fallback: {
            yes: 'Available',
            not: 'Unavailable',
        },
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
