import { TAppLocale } from '@interfaces/locale';

export const formattedDate: Function = (date: string): string => date.replace(/ /g, 'T');

export const formatDateToString = (date: Date, locale?: TAppLocale): string => {
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const MM = date.toLocaleString( locale, { month: 'short' });
    const yyyy = date.getFullYear();

    return `${MM}. ${dd}, ${yyyy}`;
};

export const getDateUtcUnix = (date: Date): number => {
    const dateUtcUnix = Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),
    );

    return dateUtcUnix;
};
