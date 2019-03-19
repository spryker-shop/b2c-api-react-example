import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from '@interfaces/cart';
import { styles } from './styles';

export interface IMiniCartItemProps extends WithStyles<typeof styles> {
    productData: ICartItem;
    deleteItem(itemId: string): void;
}
