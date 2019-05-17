import { ISuperAttribute } from '@helpers/product/types';
import { IProductImage } from '@components/ProductImageSlider/types';

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

export interface IProductAttributeNames {
    [key: string]: string;
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
    description: string | null;
    descriptionAttributes: IDescriptionAttributes[] | null;
    images: IProductImage[] | null;
    name: string | null;
    prices: {
        priceOriginalGross?: null,
        priceOriginalNet?: null,
        priceDefaultGross?: null,
        priceDefaultNet?: null,
    };
    sku: string | null;
    productType: TProductType | null;
}

export interface IProductDataParsed {
    attributeVariants: { [key: string]: IProductAttributes };
    superAttributes: ISuperAttribute[] | null;
    abstractProduct: IProductPropFullData | null;
    concreteProducts: {
        [key: string]: IProductPropFullData
    };
    productLabels: IProductLabel[] | null;
    selectedAttrNames: IProductAttributes;
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

export interface IDescriptionAttributes {
    name: string;
    value: string | number;
}
