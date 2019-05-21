import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductAttributes, IProductDataParsed, IProductPropFullData } from '@interfaces/product';
import { ICartCreatePayload } from '@services/common/Cart/types';
import { TRouterMatchParam } from '@helpers/router/types';
import { TAppStore } from '@interfaces/store';

export interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
    product: IProductDataParsed | null;
    isUserLoggedIn: boolean;
    appPriceMode: string | null;
    appStore: TAppStore;
    getProductData: Function;
    payloadForCreateCart: ICartCreatePayload;
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isInitiated: boolean;
    locationProductSKU?: TRouterMatchParam;
    isProductExist: boolean;
    anonymId: string;
    getProductAvailability: Function;
    isWishlistsFetched: boolean;
}

export interface ProductPageState extends IProductPropFullData {
    superAttrSelected: IProductAttributes;
    categoriesTree: IBreadcrumbItem[];
}
