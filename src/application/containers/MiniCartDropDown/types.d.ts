import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IMiniCartDropDownProps extends WithStyles<typeof styles>, WithRouter {
    cartItemsQuantity?: number;
    cartProductsQuantity?: number;
    isTouch?: boolean;
}

export interface IMiniCartDropDownState {
    isCartNotificationOpen: boolean;
    isPopupOpened: boolean;
    isContentHovered: boolean;
    isButtonHovered: boolean;
}
