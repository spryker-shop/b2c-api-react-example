import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductAttributes, IProductPropFullData } from '@interfaces/product';
import { IProductDataParsed } from '@helpers/parsing/product/types';
import { ICartCreatePayload } from '@services/common/Cart/types';

export interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
    product: IProductDataParsed | null;
    isUserLoggedIn: boolean;
    appPriceMode: string | null;
    appStore: string | null;
    getProductData: Function;
    payloadForCreateCart: ICartCreatePayload;
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isInitiated: boolean;
    locationProductSKU?: string | null;
    isProductExist: boolean;
    anonymId: string;
    getProductAvailability: Function;
    isWishlistsFetched: boolean;
}

export interface ProductPageState extends IProductPropFullData {
    superAttrSelected: IProductAttributes;
    categoriesTree: IBreadcrumbItem[];
}
