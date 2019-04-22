import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from '@interfaces/cart';
import { styles } from './styles';

export interface ICheckoutCartProductListProps extends WithStyles<typeof styles> {
    listItemHeight?: number;
    products: ICartItem[];
    productsAmountThreshold: number;
    isProductsExpanded: boolean;
}
