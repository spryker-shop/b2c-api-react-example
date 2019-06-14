import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IMiniCartDropDownProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
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
