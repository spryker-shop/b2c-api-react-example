import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem } from '@interfaces/cart';
import { ClickEvent, ITotals } from '@interfaces/common';
import { RouteComponentProps } from 'react-router-dom';

export interface ICheckoutCartProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    products?: ICartItem[];
    totals?: ITotals;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
    isSummaryPage: boolean;
    cartItemsQuantity?: number;
    shipmentMethodPrice?: number;
}

export interface ICheckoutCartState {
    isProductsExpanded: boolean;
    isProductsOpened: boolean;
}
