import * as React from 'react';
import { connect } from './connect';
import { FormattedTime } from 'react-intl';
import { IDateFormatterProps } from './types';

const DateFormatterComponent: React.FC<IDateFormatterProps> = (props): JSX.Element => {
    const { date, title, timeZone, locale } = props;
    const dateFormatted = date.replace(/ /g, 'T');
    const dateObj = new Date(dateFormatted);

    const dateToShow = (): string => {
        const dd = (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate();
        const mm = dateObj.toLocaleString(locale, { month: 'short' });
        const yyyy = dateObj.getFullYear();

        return `${ mm }. ${ dd }, ${ yyyy }`;
    };

    const dateUTC = (): number =>
        Date.UTC(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            dateObj.getHours(),
            dateObj.getMinutes(),
            dateObj.getSeconds()
        );

    return (
        <>
            <span>{ title && title } { `${ dateToShow() } ` }</span>
            <FormattedTime
                value={ dateUTC() }
                timeZone={ timeZone }
                hour12={ false }
                hour="2-digit"
                minute="2-digit"
            />
        </>
    );
};

export const DateFormatter = connect(DateFormatterComponent);
