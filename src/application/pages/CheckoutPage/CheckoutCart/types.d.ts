import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem } from '@interfaces/cart';
import { ClickEvent, WithRouter } from '@interfaces/common';
import { IAbstractTotals } from '@interfaces/abstract';

export interface ICheckoutCartProps extends WithStyles<typeof styles>, WithRouter {
    products?: ICartItem[];
    totals?: IAbstractTotals;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
    isSummaryPage: boolean;
    cartItemsQuantity?: number;
}

export interface ICheckoutCartState {
    isProductsExpanded: boolean;
    isProductsOpened: boolean;
}
