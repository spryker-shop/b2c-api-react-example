import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem, ICartTotals } from '@interfaces/cart';

export interface ICartDataProps extends WithStyles<typeof styles> {
    isUserLoggedIn: boolean;
    products: ICartItem[];
    totals: ICartTotals;
    order: string;
    updateCart: () => void;
    updateGuestCart: (anonymId: string) => void;
    anonymId: string;
}

export interface ICartDataState {
    listItemHeight?: number;
    products: ICartItem[];
    totals: ICartTotals;
    order: string;
}
