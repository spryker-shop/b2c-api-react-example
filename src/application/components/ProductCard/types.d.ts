import { WithStyles } from '@material-ui/core';
import { styles } from '@components/ProductCard/styles';
import { IProductCard, IProductLabel } from '@interfaces/product';

interface IProductCardProps extends WithStyles<typeof styles>, Partial<IProductCard> {
    onSelectProduct: Function;
    currency: string;
    name: string;
    sku: string;
    label: IProductLabel[] | null;
}
