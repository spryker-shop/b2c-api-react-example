import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductPropFullData, TProductType } from '@interfaces/product';
import { ICartCreatePayload } from '@services/common/Cart/types';

export interface IProductConfiguratorAddToCartProps extends WithStyles<typeof styles> {
    product: IProductPropFullData | null;
    productType: TProductType | null;
    sku: string | null;
    isUserLoggedIn?: boolean;
    addItemToCart?: Function;
    addItemGuestCart?: Function;
    createCartAndAddItem?: Function;
    cartCreated?: boolean;
    cartId?: string;
    payloadForCreateCart?: ICartCreatePayload;
    anonymId?: string;
}

export interface IProductConfiguratorAddToCartState {
    quantitySelected: number;
    quantity: number;
    isBuyBtnDisabled?: boolean;
    isProcessCartLoading?: boolean;
    availability: boolean | null;
    sku: string | null;
    isUpdateValue: boolean;
}
