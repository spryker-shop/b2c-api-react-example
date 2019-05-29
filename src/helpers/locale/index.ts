import * as de from 'react-intl/locale-data/de';
import * as en from 'react-intl/locale-data/en';
import { LocaleData } from 'react-intl';
import { APP_LOCALE_DE, APP_LOCALE_EN } from '@constants/common';

export const getLocaleData = (locale: string | null): LocaleData => {
    switch (locale) {
        case APP_LOCALE_DE:
            return de;
        case APP_LOCALE_EN:
            return en;
        default:
            return de;
    }
};
