import { IOrderDetailsParsed } from '@interfaces/order';

export interface IDateFormatterProps {
    date: IOrderDetailsParsed['dateCreated'];
    timeZone: string | null;
    title?: string | JSX.Element;
    locale?: string | null;
}
