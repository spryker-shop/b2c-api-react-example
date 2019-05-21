import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from '@interfaces/cart';
import { styles } from './styles';
import { IAbstractTotals } from '@interfaces/abstract';

export interface IMiniCartDropProps extends WithStyles<typeof styles> {
    totals: IAbstractTotals | null;
    cartItems: ICartItem[] | null;
    isUserLoggedIn: boolean;
    cartId: string;
    anonymId: string;
    isCartLoading: boolean;
    cartItemsQuantity: number;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
    cartDeleteItemAction?: (cartId: string, itemId: string) => void;
    removeItemGuestCartAction?: (cartId: string, itemId: string, anonymId: string) => void;
    clearCheckoutDataForm: () => void;
}
