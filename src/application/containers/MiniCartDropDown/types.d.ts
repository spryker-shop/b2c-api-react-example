import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';
import { TProductQuantity } from '@interfaces/product';

export interface IMiniCartDropDownProps extends WithStyles<typeof styles>, WithRouter {
    cartItemsQuantity?: TProductQuantity;
    cartProductsQuantity?: TProductQuantity;
}

export interface IMiniCartDropDownState {
    anchorElement: HTMLElement | null;
    isCartNotificationOpen: boolean;
}
