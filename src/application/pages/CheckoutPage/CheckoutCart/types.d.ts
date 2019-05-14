import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { ClickEvent, WithRouter } from '@interfaces/common';

export interface ICheckoutCartProps extends WithStyles<typeof styles>, WithRouter {
    products?: ICartItem[];
    totals?: ICartTotals;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
    isSummaryPage: boolean;
    cartItemsQuantity?: number;
}

export interface ICheckoutCartState {
    isProductsExpanded: boolean;
    isProductsOpened: boolean;
}
