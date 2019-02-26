import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IProductCard, TProductCurrency } from '@interfaces/product';
import { IAvailableLabelsCollection, IProductsLabeledCollection } from '@interfaces/searchPageData';

export interface IProductsListProps extends WithStyles<typeof styles> {
    products: IProductCard[];
    selectProductHandler: Function;
    currency: TProductCurrency;
    isLoading: boolean;
    productsLabeled: IProductsLabeledCollection | null;
    availableLabels: IAvailableLabelsCollection | null;
}
