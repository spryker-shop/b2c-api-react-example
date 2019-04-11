import { IProductRelationsItem } from '@interfaces/productRelations';
import { TAppCurrency } from '@interfaces/currency';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface ISlickSliderProps extends WithStyles<typeof styles> {
    products: IProductRelationsItem[];
    currency: TAppCurrency;
    onSelectProduct: Function;
    width: Breakpoint;
}
