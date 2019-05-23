import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem } from '@interfaces/cart';
import { ClickEvent, WithRouter, ITotals } from '@interfaces/common';

export interface ICheckoutCartProps extends WithStyles<typeof styles>, WithRouter {
    products?: ICartItem[];
    totals?: ITotals;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
    isSummaryPage: boolean;
    cartItemsQuantity?: number;
}

export interface ICheckoutCartState {
    isProductsExpanded: boolean;
    isProductsOpened: boolean;
}
