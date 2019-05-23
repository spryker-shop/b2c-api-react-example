import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsItem } from '@interfaces/order';
import { ICartCreatePayload } from '@interfaces/cart';

export interface IOrderProductListProps extends WithStyles<typeof styles> {
    items: IOrderDetailsItem[];
    isCartLoading?: boolean;
    cartId?: string;
    addItemToCart?: Function;
    createCartAndAddItem?: Function;
    payloadForCreateCart?: ICartCreatePayload;
}
