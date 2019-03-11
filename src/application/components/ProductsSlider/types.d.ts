import { IProductRelationsItem } from '@interfaces/productRelations';
import { TAppCurrency } from '@interfaces/currency';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISlickSliderProps extends WithStyles<typeof styles> {
    products: IProductRelationsItem[];
    currency: TAppCurrency;

    onSelectProduct: Function;
}
