
import { IProductRelationsItem } from '@interfaces/productRelations';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductRelationsProps extends WithStyles<styles> {
    isLoading?: boolean;
    sku?: string;
    products?: IProductRelationsItem[];
    currency?: string | null;
    title?: string | JSX.Element;
    getProductRelations?: (sku: string) => void;
    getProductRelationsCart?: (cartId: string, isUserLoggedIn: boolean, anonymId: string) => void;
    changeLocation?: Function;
    cartId?: string;
    isUserLoggedIn?: boolean;
    anonymId?: string;
}
