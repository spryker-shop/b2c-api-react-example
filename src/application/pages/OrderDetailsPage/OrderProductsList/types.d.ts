import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsItem } from '@interfaces/order';

export interface IOrderProductListProps extends WithStyles<typeof styles> {
    items: IOrderDetailsItem[];
    isCartLoading?: boolean;
    cartId?: string;
    addItemToCart?: Function;
}
