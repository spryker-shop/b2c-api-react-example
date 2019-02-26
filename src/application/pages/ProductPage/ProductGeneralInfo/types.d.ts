import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TPriceTypeDefaultGross, TPriceTypeOriginalGross, TProductName, TProductSKU } from '@interfaces/product';

export interface IProductGeneralInfoProps extends WithStyles<typeof styles> {
    name: TProductName;
    sku: TProductSKU;
    price: TPriceTypeOriginalGross;
    oldPrice: TPriceTypeDefaultGross;
    availability: string;
}
