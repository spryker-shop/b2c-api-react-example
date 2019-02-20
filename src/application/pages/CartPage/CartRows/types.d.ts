import { ICartItem, TCartId } from '@interfaces/cart';

import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface CartRowsProps extends WithStyles<typeof styles> {
    items: ICartItem[] | null;
    cartId: TCartId;
    isUserLoggedIn: boolean;
    anonymId: string;
    updateItemInCartAction: Function;
    cartDeleteItemAction: Function;
    removeItemGuestCartAction: Function;
    updateGuestCartAction: Function;
}

export interface CartRowsState {
    imageItemHeight: number;
}
