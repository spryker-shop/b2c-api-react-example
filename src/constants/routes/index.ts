import { IIndexSignature } from '@interfaces/common';

const config = require('@configs/env_config');
export const pathHomePage: string = `${config.WEB_PATH}`;
export const pathSearchPage: string = `${config.WEB_PATH}search`;
export const pathCategoryPageBase: string = `${config.WEB_PATH}category`;
export const pathCategoryPage: string = `${pathCategoryPageBase}/:categoryId`;
export const pathProductPageBase: string = `${config.WEB_PATH}product`;
export const pathProductPage: string = `${pathProductPageBase}/:productId`;
export const pathLoginPage: string = `${config.WEB_PATH}login`;
export const pathRegisterPage: string = `${config.WEB_PATH}register`;
export const pathCartPage: string = `${config.WEB_PATH}cart`;
export const pathCustomerPage: string = `${config.WEB_PATH}customer`;
export const pathWishlistsPage: string = `${pathCustomerPage}/wishlists`;
export const pathWishlistDetailPage: string = `${pathWishlistsPage}/:wishlistId`;
export const pathOrderHistoryPage: string = `${pathCustomerPage}/order`;
export const pathOrderDetailsPageBase: string = `${pathOrderHistoryPage}/details`;
export const pathOrderDetailsPage: string = `${pathOrderDetailsPageBase}/:orderId`;
export const pathForgotPassword: string = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword: string = `${config.WEB_PATH}password/restore`;
export const pathCustomerProfilePage: string = `${pathCustomerPage}/profile`;
export const pathCustomerOverviewPage: string = `${pathCustomerPage}/overview`;
export const pathCustomerAddressesPage: string = `${pathCustomerPage}/addresses`;
export const pathAddressFormUpdateBase: string = `${pathCustomerAddressesPage}/update`;
export const pathAddressFormUpdate: string = `${pathAddressFormUpdateBase}/:addressId`;
export const pathAddressFormNew: string = `${pathCustomerAddressesPage}/new`;
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
    [pathURLToCategoryNew]: 'NEW',
};
export const pathCategoryComputers: string = `${pathCategoryPageBase}/5`;
export const pathCategoryNotebooks: string = `${pathCategoryPageBase}/6`;
export const pathCategoryWorkstations: string = `${pathCategoryPageBase}/7`;
export const pathCategoryTablets: string = `${pathCategoryPageBase}/8`;
export const pathCategorySale: string = `${pathCategoryPageBase}/${pathURLToCategorySale}`;
export const pathCategoryNew: string = `${pathCategoryPageBase}/${pathURLToCategoryNew}`;
