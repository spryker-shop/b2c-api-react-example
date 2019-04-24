import { WithStyles } from '@material-ui/core';
import { styles } from '@components/ProductCard/styles';
import { IProductCard, IProductLabel, TProductCurrency, TProductName, TProductSKU } from '@interfaces/product';

interface IProductCardProps extends WithStyles<typeof styles>, IProductCard {
    onSelectProduct: Function;
    currency: TProductCurrency;
    name: TProductName;
    sku: TProductSKU;
    label: IProductLabel | null;
}
