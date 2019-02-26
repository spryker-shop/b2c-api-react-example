import { IOrderDetailsParsed } from '@interfaces/order';
import { TAppTimeZone } from '@interfaces/locale';

export interface IDateFormatterProps {
    date: IOrderDetailsParsed['dateCreated'];
    timeZone: TAppTimeZone;
    title: string | React.ReactNode;
}
