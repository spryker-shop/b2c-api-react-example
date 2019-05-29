import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductPropFullData, TProductType } from '@interfaces/product';

export interface IProductConfiguratorAddToCartProps extends WithStyles<typeof styles> {
    product: IProductPropFullData;
    productType: TProductType;
    sku: string;
    isUserLoggedIn?: boolean;
    addItemToCartAction?: Function;
    cartId?: string;
    anonymId?: string;
    isCartLoading?: boolean;
}

export interface IProductConfiguratorAddToCartState {
    quantitySelected: number;
    isAvailable: boolean;
    sku: string;
    isUpdateValue: boolean;
}
