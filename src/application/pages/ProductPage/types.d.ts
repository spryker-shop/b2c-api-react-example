import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    IProductAttributeMap,
    IProductAttributes,
    IProductDataParsed,
    IProductPropFullData,
    ISuperAttributes,
    TAppPriceMode,
} from '@interfaces/product';
import { ICartCreatePayload } from '@services/common/Cart/types';
import { TRouterMatchParam } from '@helpers/router/types';
import { TAppStore } from '@interfaces/store';

export interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
    product: IProductDataParsed | null;
    isAppDataSet: boolean;
    isUserLoggedIn: boolean;
    appPriceMode: TAppPriceMode;
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
}

export interface ProductPageState extends IProductPropFullData, ISuperAttributes {
    attributeMap: IProductAttributeMap | null;
    superAttrSelected: IProductAttributes;
}
