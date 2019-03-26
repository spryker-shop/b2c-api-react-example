import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TLanguage } from './types';

export const availableLanguages: TLanguage[] = [
    {
        name: <FormattedMessage id={ 'language.english.title' } />,
        code: 'en'
    },
    {
        name: <FormattedMessage id={ 'language.deutsch.title' } />,
        code: 'de'
    }
];
