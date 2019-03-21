import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IAvailableLabelsCollection, IProductsLabeledCollection } from '@interfaces/searchPageData';

export type IProductImage = {
    id: number;
    src: string;
};

export interface IProductImageSliderProps extends WithStyles<typeof styles> {
    images: IProductImage[];
    productsLabeled: string[] | null;
    availableLabels: IAvailableLabelsCollection | null;
}
