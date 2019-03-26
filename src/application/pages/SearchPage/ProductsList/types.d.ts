import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductLabel } from '@interfaces/product';

export interface IProductsListProps extends WithStyles<typeof styles> {
    products: IProductCard[];
    selectProductHandler: Function;
    currency: TProductCurrency;
    isLoading: boolean;
    productLabels: IProductLabel[] | null;
}
