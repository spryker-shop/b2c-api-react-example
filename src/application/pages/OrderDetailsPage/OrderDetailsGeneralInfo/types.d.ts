import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from '@interfaces/order';
import { TAppTimeZone } from '@interfaces/locale';

export interface IOrderDetailsGeneralInfoProps extends WithStyles<typeof styles> {
    orderId: IOrderDetailsParsed['id'];
    dateOrder: IOrderDetailsParsed['dateCreated'];
    priceMode: IOrderDetailsParsed['priceMode'];
    timeZone?: TAppTimeZone;
}
