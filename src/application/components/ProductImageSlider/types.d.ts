import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductLabel, IProductImage } from '@interfaces/product';
import { CustomArrowProps } from 'react-slick';

export interface IProductImageSliderProps extends WithStyles<typeof styles> {
    images: IProductImage[];
    productLabels?: IProductLabel[];
}

export interface ICustomArrowProps extends CustomArrowProps {
    children: JSX.Element;
}
