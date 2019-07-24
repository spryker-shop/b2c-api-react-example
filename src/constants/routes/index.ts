import { IIndexSignature } from '@interfaces/common';

const config = require('@configs/env_config');
export const pathHomePage: string = `${config.WEB_PATH}`;
export const pathSearchPage: string = `${config.WEB_PATH}search`;
export const pathCategoryPageBase: string = `${config.WEB_PATH}category`;
export const pathCategoryPage: string = `${pathCategoryPageBase}/:categoryId`;
export const pathProductPageBase: string = `${config.WEB_PATH}product`;
export const pathProductPage: string = `${pathProductPageBase}/:productId`;
export const pathAuthenticationPage: string = `${config.WEB_PATH}authentication`;
export const pathLoginPage: string = `${pathAuthenticationPage}/login`;
export const pathRegisterPage: string = `${pathAuthenticationPage}/register`;
export const pathCartPage: string = `${config.WEB_PATH}cart`;
export const pathCustomerPage: string = `${config.WEB_PATH}customer`;
export const pathWishlistsPage: string = `${pathCustomerPage}/wishlists`;
export const pathCustomerWishlistDetail: string = `${pathWishlistsPage}/:wishlistId`;
export const pathCustomerOrderHistory: string = `${pathCustomerPage}/order`;
export const pathCustomerOrderDetailsBase: string = `${pathCustomerOrderHistory}/details`;
export const pathCustomerOrderDetails: string = `${pathCustomerOrderDetailsBase}/:orderId`;
export const pathForgotPassword: string = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword: string = `${config.WEB_PATH}password/restore`;
export const pathCustomerProfile: string = `${pathCustomerPage}/profile`;
export const pathCustomerOverview: string = `${pathCustomerPage}/overview`;
export const pathCustomerAddresses: string = `${pathCustomerPage}/addresses`;
export const pathAddressFormUpdateBase: string = `${pathCustomerAddresses}/update`;
export const pathAddressFormUpdate: string = `${pathAddressFormUpdateBase}/:addressId`;
export const pathAddressFormNew: string = `${pathCustomerAddresses}/new`;
export const pathCheckoutPage: string = `${config.WEB_PATH}checkout`;
export const pathCheckoutLoginStep: string = `${pathCheckoutPage}/login`;
export const pathCheckoutAddressStep: string = `${pathCheckoutPage}/address`;
export const pathCheckoutShipmentStep: string = `${pathCheckoutPage}/shipment`;
export const pathCheckoutPaymentStep: string = `${pathCheckoutPage}/payment`;
export const pathCheckoutSummaryStep: string = `${pathCheckoutPage}/summary`;
export const pathCheckoutThanks: string = `${pathCheckoutPage}/thanks`;
export const pathNotFoundPage: string = `${config.WEB_PATH}*`;
export const pathURLToCategorySale: string = 'outlet';
export const pathURLToCategoryNew: string = 'new';
export const labeledCategories: IIndexSignature = {
    [pathURLToCategorySale]: 'SALE %',
    [pathURLToCategoryNew]: 'New',
};
export const pathCategoryComputers: string = `${pathCategoryPageBase}/5`;
export const pathCategoryNotebooks: string = `${pathCategoryPageBase}/6`;
export const pathCategoryWorkstations: string = `${pathCategoryPageBase}/7`;
export const pathCategoryTablets: string = `${pathCategoryPageBase}/8`;
export const pathCategorySale: string = `${pathCategoryPageBase}/${pathURLToCategorySale}`;
export const pathCategoryNew: string = `${pathCategoryPageBase}/${pathURLToCategoryNew}`;
