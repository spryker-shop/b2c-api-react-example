import * as React from 'react';
import { connect } from './connect';
import { FormattedTime } from 'react-intl';
import { formatDateToString, formattedDate, getDateUtcUnix } from '@helpers/common';
import { IDateFormatterProps } from './types';

const DateFormatterComponent: React.SFC<IDateFormatterProps> = (props): JSX.Element => {
    const { date, title, timeZone, locale } = props;
    const dateFormatted = formattedDate(date);
    const dateObj = new Date(dateFormatted);
    const dateToShow = formatDateToString(dateObj, locale);
    const dateUTC = getDateUtcUnix(dateObj);

    return (
        <>
            <span>{ title && title } { `${ dateToShow } ` }</span>
            <FormattedTime
                value={ dateUTC }
                timeZone={ timeZone }
                hour12={ false }
                hour="2-digit"
                minute="2-digit"
            />
        </>
    );
};

export const DateFormatter = connect(DateFormatterComponent);
