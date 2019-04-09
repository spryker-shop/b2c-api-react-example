const config = require('@configs/env.config');
export const pathHomePage = `${config.WEB_PATH}`;
export const pathSearchPage = `${config.WEB_PATH}search`;
export const pathCategoryPageBase = `${config.WEB_PATH}category`;
export const pathCategoryPage = `${pathCategoryPageBase}/:categoryId`;
export const pathProductPageBase = `${config.WEB_PATH}product`;
export const pathProductPage = `${pathProductPageBase}/:productId`;
export const pathLoginPage = `${config.WEB_PATH}login`;
export const pathRegisterPage = `${config.WEB_PATH}register`;
export const pathCartPage = `${config.WEB_PATH}cart`;
export const pathCustomerPage = `${config.WEB_PATH}customer`;
export const pathWishlistsPage = `${pathCustomerPage}/wishlists`;
export const pathWishlistPageBase = `${pathCustomerPage}/wishlist`;
export const pathWishlistDetailPage = `${pathWishlistPageBase}/:wishlistId`;
export const pathOrderHistoryPage = `${pathCustomerPage}/order`;
export const pathOrderDetailsPageBase = `${pathOrderHistoryPage}/details`;
export const pathOrderDetailsPage = `${pathOrderDetailsPageBase}/:orderId`;
export const pathForgotPassword = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword = `${config.WEB_PATH}password/restore`;
export const pathCustomerProfilePage = `${pathCustomerPage}/profile`;
export const pathCustomerAddressesPage = `${pathCustomerPage}/addresses`;
export const pathAddressFormUpdateBase = `${pathCustomerAddressesPage}/update`;
export const pathAddressFormUpdate = `${pathAddressFormUpdateBase}/:addressId`;
export const pathAddressFormNew = `${pathCustomerAddressesPage}/new`;
export const pathCheckoutPage = `${config.WEB_PATH}checkout`;
export const pathNotFoundPage = `${config.WEB_PATH}*`;
export const pathURLToCategorySale = 'outlet';
export const pathURLToCategoryNew = 'new';
export const labeledCategories: { [key: string]: string } = {
    [pathURLToCategorySale]: 'SALE %',
    [pathURLToCategoryNew]: 'NEW',
};
export const pathCategoryComputers = `${pathCategoryPageBase}/5`;
export const pathCategoryNotebooks = `${pathCategoryPageBase}/6`;
export const pathCategoryWorkstations = `${pathCategoryPageBase}/7`;
export const pathCategoryTablets = `${pathCategoryPageBase}/8`;
export const pathCategorySale = `${pathCategoryPageBase}/${pathURLToCategorySale}`;
export const pathCategoryNew = `${pathCategoryPageBase}/${pathURLToCategoryNew}`;
