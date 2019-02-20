import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/ShoppingCart/styles';
import { TProductQuantity } from '@interfaces/product';

interface IShoppingCartProps extends WithStyles<typeof styles> {
    cartItemsQuantity: TProductQuantity;
    cartProductsQuantity: TProductQuantity;
}
