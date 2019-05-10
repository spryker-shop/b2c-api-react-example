import { ISuperAttribute } from '@helpers/product/types';

export const concreteProductType = 'concreteProduct';
export type TConcreteProductType = 'concreteProduct';

export const abstractProductType = 'abstractProduct';
export type TAbstractProductType = 'abstractProduct';

export const absentProductType = 'absentProduct';
export type TAbsentProductType = 'absentProduct';

export const priceTypeNameDefault = 'DEFAULT';
export type TPriceTypeNameDefault = 'DEFAULT';

export const priceTypeNameOriginal = 'ORIGINAL';
export type TPriceTypeNameOriginal = 'ORIGINAL';

export const defaultItemValueDropdown = ' ';

export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;
export type TPriceTypeName = TPriceTypeNameDefault | TPriceTypeNameOriginal;

export interface IProductPricesItem {
    grossAmount: number | null;
    netAmount: number | null;
    priceTypeName: TPriceTypeName;
    currency?: {
        code: string;
        name: string;
        symbol: string
    };
}

export interface IProductCardImages {
    externalUrlLarge: string;
    externalUrlSmall: string;
}

export interface IProductCard {
    images?: IProductCardImages[] | null;
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPricesItem[];
    labels?: IProductLabel[] | null;
}

export interface IProductAttributeMap {
    attribute_variants: { [key: string]: IProductAttributes };
    product_concrete_ids: string[];
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
    availability: boolean | null;
    quantity?: number | null;
    isNeverOutOfStock?: boolean;
}

export interface IConcreteProductAvailability extends IProductAvailability {
    sku: string | null;
}

export interface IProductPropFullData extends IProductAvailability {
    attributes: object | null;
    attributeNames: IProductAttributeNames | null;
    description: string | null;
    images: IProductCardImages[] | null;
    name: string | null;
    price: number | null;
    prices: IProductPricesItem[] | null;
    priceOriginalGross: number | null;
    priceOriginalNet: number | null;
    priceDefaultGross: number | null;
    priceDefaultNet: number | null;
    sku: string | null;
    productType: TProductType | null;
}

export interface IProductDataParsed {
    attributeMap: IProductAttributeMap | null;
    superAttributes: ISuperAttribute[] | null;
    abstractProduct: IProductPropFullData | null;
    concreteProducts: {
        [key: string]: IProductPropFullData
    };
    productLabels: IProductLabel[] | null;
}

export interface IProductLabel {
    type: string;
    text: string;
    position: number;
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
