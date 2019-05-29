import { IProductRelationsItem } from '@interfaces/productRelations';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface ISlickSliderProps extends WithStyles<typeof styles> {
    products: IProductRelationsItem[];
    currency: string | null;
    onSelectProduct: Function;
    width: Breakpoint;
}
