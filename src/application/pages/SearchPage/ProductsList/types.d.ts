import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductsListProps extends WithStyles<typeof styles> {
    products: IProductCard[];
    selectProductHandler: Function;
    currency: TProductCurrency;
    isLoading: boolean;
}
