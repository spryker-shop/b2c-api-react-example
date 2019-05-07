import { IOrderDetailsParsed } from '@interfaces/order';
import { TAppLocale, TAppTimeZone } from '@interfaces/locale';

export interface IDateFormatterProps {
    date: IOrderDetailsParsed['dateCreated'];
    timeZone: TAppTimeZone;
    title?: string | React.ReactNode;
    locale?: TAppLocale;
}
