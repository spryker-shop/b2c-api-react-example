import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductLabel, IProductImage } from '@interfaces/product';

export interface IProductImageSliderProps extends WithStyles<typeof styles> {
    images: IProductImage[];
    productLabels?: IProductLabel[];
}
