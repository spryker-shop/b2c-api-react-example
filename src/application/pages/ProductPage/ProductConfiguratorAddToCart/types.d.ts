import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductPropFullData, TProductType } from '@interfaces/product';

export interface IProductConfiguratorAddToCartProps extends WithStyles<typeof styles> {
    product: IProductPropFullData | null;
    productType: TProductType | null;
    sku: string | null;
    isUserLoggedIn?: boolean;
    addItemToCart?: Function;
    cartId?: string;
    anonymId?: string;
    isCartLoading?: boolean;
}

export interface IProductConfiguratorAddToCartState {
    quantitySelected: number;
    quantity: number;
    isAvailable: boolean | null;
    sku: string | null;
    isUpdateValue: boolean;
}
