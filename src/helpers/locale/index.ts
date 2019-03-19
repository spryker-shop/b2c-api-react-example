import * as de from 'react-intl/locale-data/de';
import * as en from 'react-intl/locale-data/en';
import { TAppLocale } from '@interfaces/locale';
import { LocaleData } from 'react-intl';
import { APP_LOCALE_DE, APP_LOCALE_EN } from '@configs/environment';

export const getLocaleData = (locale: TAppLocale): LocaleData => {
    switch (locale) {
        case APP_LOCALE_DE:
            return de;
        case APP_LOCALE_EN:
            return en;
        default:
            return de;
    }
};
