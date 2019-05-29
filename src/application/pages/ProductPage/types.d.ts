import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductAttributes, IProductPropFullData, IProductDataParsed } from '@interfaces/product';

export interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
    product: IProductDataParsed;
    isUserLoggedIn: boolean;
    appPriceMode: string;
    appStore: string;
    getProductDataAction: Function;
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isInitiated: boolean;
    locationProductSKU?: string;
    isProductExist: boolean;
    anonymId: string;
    getProductAvailability: Function;
    isWishlistsFetched: boolean;
}

export interface ProductPageState extends IProductPropFullData {
    superAttrSelected: IProductAttributes;
    categoriesTree: IBreadcrumbItem[];
}
