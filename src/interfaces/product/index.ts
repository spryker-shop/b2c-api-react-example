import { ISuperAttribute } from '@helpers/product/types';

// Constants
export const concreteProductType = 'concreteProduct';
export type TConcreteProductType = 'concreteProduct';

export const abstractProductType = 'abstractProduct';
export type TAbstractProductType = 'abstractProduct';

export const absentProductType = 'absentProduct';
export type TAbsentProductType = 'absentProduct';

export const defaultItemValueDropdown = ' ';

// Types
export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;
export type TProductDescription = string;
export type TProductSKU = string;
export type TProductName = string;
export type TProductPrice = number;
export type TProductQuantity = number;
export type TProductCurrency = string;
export type TProductCurrencyCode = string;
export type TProductCurrencyName = string;
export type TProductCurrencySymbol = string;
export type TProductAvailability = boolean;
export type TProductAttributes = object;
export type TProductImageSRC = string;
export type TProductAttributeMap = object;
export type TProductLabelPosition = number;
export type TProductIsNeverOutOfStock = boolean;

export const priceTypeNameDefault = 'DEFAULT';
export type TPriceTypeNameDefault = 'DEFAULT';
export const priceTypeNameOriginal = 'ORIGINAL';
export type TPriceTypeNameOriginal = 'ORIGINAL';

export type TPriceTypeName = TPriceTypeNameDefault | TPriceTypeNameOriginal;
export type TPriceTypeOriginalGross = number | null;
export type TPriceTypeOriginalNet = number | null;
export type TPriceTypeDefaultGross = number | null;
export type TPriceTypeDefaultNet = number | null;
export type TAppPriceMode = string | null;

export type TProductCardImagesCollection = IProductCardImages[];

// Interfaces

export interface IProductPricesItem {
    grossAmount: TPriceTypeOriginalGross | TPriceTypeDefaultGross;
    netAmount: TPriceTypeOriginalNet | TPriceTypeDefaultNet;
    priceTypeName: TPriceTypeName;
    currency?: {
        code: TProductCurrencyCode;
        name: TProductCurrencyName;
        symbol: TProductCurrencySymbol
    };
}

export interface IProductCardImages {
    externalUrlLarge: TProductImageSRC;
    externalUrlSmall: TProductImageSRC;
}

export interface IProductCard {
    images?: IProductCardImages[] | null;
    price: TProductPrice;
    abstractName: TProductName;
    abstractSku: TProductSKU;
    prices: IProductPricesItem[];

}

export interface IProductAttributeMap {
    attribute_variants: { [key: string]: IProductAttributes };
    product_concrete_ids: TProductSKU[];
    super_attributes: { [key: string]: string[] };
}

export interface IProductAttributes {
    [key: string]: string | number;
}

// Translated version of the product's attributes
export interface IProductAttributeNames {
    [key: string]: string;
}

export interface ISuperAttributes {
    superAttributes: ISuperAttribute[] | null;
}

export interface IProductAvailability {
    availability: TProductAvailability | null;
    quantity?: TProductQuantity | null;
    isNeverOutOfStock?: TProductIsNeverOutOfStock;
}

export interface IConcreteProductAvailability extends IProductAvailability {
    sku: TProductSKU | null;
}

export interface IProductPropFullData extends IProductAvailability {
    attributes: TProductAttributes | null;
    attributeNames: IProductAttributeNames | null;
    description: TProductDescription | null;
    images: IProductCardImages[] | null;
    name: TProductName | null;
    price: TProductPrice | null;
    prices: IProductPricesItem[] | null;
    priceOriginalGross: TPriceTypeOriginalGross;
    priceOriginalNet: TPriceTypeOriginalNet;
    priceDefaultGross: TPriceTypeDefaultGross;
    priceDefaultNet: TPriceTypeDefaultNet;
    sku: TProductSKU | null;
    productType: TProductType | null;
}

export interface IProductDataParsed {
    attributeMap: IProductAttributeMap | null;
    superAttributes: ISuperAttribute[] | null;
    abstractProduct: IProductPropFullData | null;
    concreteProducts: {
        [key: string]: IProductPropFullData
    };
}

export interface IProductLabel {
    type: string;
    text: string;
    position: TProductLabelPosition;
}

export interface IProductAttributesRawResponse {
    sku: string;
    name: string;
    description: string;
    attributes: IProductAttributes;
    attributeNames: IProductAttributeNames;
    attributeMap: IProductAttributeMap;
    id: string;
    superAttributesDefinition?: string[];
    metaDescription: string;
    metaKeywords: string;
    metaTitle: string;
}

export interface IProductImageSetsRawResponse {
    images: IProductCardImages[];
    name?: string;
}

export type TProductImageSetsCollectionRawResponse = IProductImageSetsRawResponse[];
