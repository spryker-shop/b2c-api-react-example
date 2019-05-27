import { WithStyles } from '@material-ui/core';
import { IProductCard } from '@interfaces/product';
import { styles } from './styles';

export interface IProductsListProps extends WithStyles<typeof styles> {
    products: IProductCard[];
    selectProductHandler: Function;
    currency: string;
    isLoading: boolean;
}
