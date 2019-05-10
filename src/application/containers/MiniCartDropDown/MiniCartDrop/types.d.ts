import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals, TCartId, ICartItem } from '@interfaces/cart';
import { styles } from './styles';

export interface IMiniCartDropProps extends WithStyles<typeof styles> {
    totals: ICartTotals | null;
    cartItems: ICartItem[] | null;
    isUserLoggedIn: boolean;
    cartId: string;
    anonymId: string;
    isCartLoading: boolean;
    cartItemsQuantity: number;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
    cartDeleteItemAction?: (cartId: TCartId, itemId: string) => void;
    removeItemGuestCartAction?: (cartId: TCartId, itemId: string, anonymId: string) => void;
    clearCheckoutDataForm: () => void;
}
