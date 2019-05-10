
import { IProductRelationsItem } from '@interfaces/productRelations';
import { TAppCurrency } from '@interfaces/currency';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TCartId } from '@interfaces/cart';

export interface IProductRelationsProps extends WithStyles<styles> {
    isLoading?: boolean;
    sku?: string;
    products?: IProductRelationsItem[];
    currency?: TAppCurrency;
    title?: string | JSX.Element;
    getProductRelations?: (sku: string) => void;
    getProductRelationsCart?: (cartId: TCartId) => void;
    changeLocation?: Function;
    cartId?: TCartId;
}
