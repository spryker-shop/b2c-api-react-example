import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals, TCartId, ICartItem } from '@interfaces/cart';
import { TProductQuantity, TProductSKU } from '@interfaces/product';
import { styles } from './styles';

export interface IMiniCartDropProps extends WithStyles<typeof styles> {
    totals: ICartTotals | null;
    cartItems: ICartItem[] | null;
    isUserLoggedIn: boolean;
    cartId: string;
    anonymId: string;
    isCartLoading: boolean;
    cartItemsQuantity: TProductQuantity;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
    cartDeleteItemAction?: (cartId: TCartId, itemId: TProductSKU) => void;
    removeItemGuestCartAction?: (cartId: TCartId, itemId: TProductSKU, anonymId: string) => void;
}
