import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductLabel } from '@interfaces/product';

export type IProductImage = {
    id: number;
    src: string;
};

export interface IProductImageSliderProps extends WithStyles<typeof styles> {
    images: IProductImage[];
    productLabels?: IProductLabel[] | null;
}
