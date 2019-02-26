import * as React from 'react';
import { connect } from './connect';
import { FormattedDate } from 'react-intl';
import { formatDateToString, getDateUtcUnix } from '@helpers/common/dates';
import { IDateFormatterProps } from './types';

const DateFormatterBase: React.SFC<IDateFormatterProps> = (props): JSX.Element => {
    const {date, title, timeZone} = props;
    const dateObj = new Date(date);
    const dateToShow = formatDateToString(dateObj);
    const dateUTC = getDateUtcUnix(dateObj);

    return (
        <>
            <span>{title} {`${dateToShow}, `}</span>
            <FormattedDate
                value={dateUTC}
                timeZone={timeZone}
                hour12={true}
                hour="2-digit"
                minute="2-digit"
            />
        </>
    );
};

export const DateFormatter = connect(DateFormatterBase);
