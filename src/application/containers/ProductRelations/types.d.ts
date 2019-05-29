
import { IProductRelationsItem } from '@interfaces/product';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductRelationsProps extends WithStyles<styles> {
    isLoading?: boolean;
    sku?: string;
    products?: IProductRelationsItem[];
    currency?: string | null;
    title?: string | JSX.Element;
    getProductRelationsAction?: (sku: string) => void;
    getProductRelationsCartAction?: (cartId: string, isUserLoggedIn: boolean, anonymId: string) => void;
    push?: Function;
    cartId?: string;
    isUserLoggedIn?: boolean;
    anonymId?: string;
}
