import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from '@interfaces/cart';
import { styles } from './styles';
import { ITotals } from '@interfaces/common';

export interface IMiniCartDropProps extends WithStyles<typeof styles> {
    totals: ITotals;
    cartItems: ICartItem[];
    isUserLoggedIn: boolean;
    cartId: string;
    anonymId: string;
    isCartLoading: boolean;
    cartItemsQuantity: number;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
    cartDeleteItemAction?: (cartId: string, itemId: string, anonymId: string, isUserLoggedIn: boolean) => void;
    clearCheckoutDataForm: () => void;
}
