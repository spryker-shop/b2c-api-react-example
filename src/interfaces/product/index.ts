import { IProductImage } from '@components/ProductImageSlider/types';
import { IAvailableLabel } from '@interfaces/search';

export const concreteProductType = 'concreteProduct';
export type TConcreteProductType = 'concreteProduct';

export const abstractProductType = 'abstractProduct';
export type TAbstractProductType = 'abstractProduct';

export type TAbsentProductType = 'absentProduct';

export const priceTypeNameDefault = 'DEFAULT';
export type TPriceTypeNameDefault = 'DEFAULT';

export const priceTypeNameOriginal = 'ORIGINAL';
export type TPriceTypeNameOriginal = 'ORIGINAL';

export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;
export type TPriceTypeName = TPriceTypeNameDefault | TPriceTypeNameOriginal;

export interface IProductPricesItem {
    grossAmount: number;
    netAmount: number;
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
    image?: string;
    images?: IProductCardImages[];
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductParsedPrices;
    labels?: IProductLabel[];
}

export interface IProductAttributeMap {
    attribute_variants: { [key: string]: IProductAttributes };
    product_concrete_ids: string[];
    super_attributes: { [key: string]: string[] };
}

export interface IProductAttributes {
    [key: string]: string | number;
}

export interface IProductAvailability {
    availability: boolean;
    quantity?: number;
    isNeverOutOfStock?: boolean;
}

export interface IConcreteProductAvailability extends IProductAvailability {
    sku: string;
}

export interface IProductPropFullData extends IProductAvailability {
    description: string;
    descriptionAttributes: IDescriptionAttributes[];
    images: IProductImage[];
    name: string;
    prices: IProductParsedPrices;
    sku: string;
    productType: TProductType;
}

export interface IProductDataParsed {
    attributeVariants: { [key: string]: IProductAttributes };
    superAttributes: ISuperAttribute[];
    abstractProduct: IProductPropFullData;
    concreteProducts: {
        [key: string]: IProductPropFullData
    };
    productLabels: IProductLabel[];
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
    attributeNames: IIndexSignature;
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

export interface IIndexSignature {
    [key: string]: string;
}

export interface ISuperAttribute {
    name: string;
    nameToShow: string;
    data: ISuperAttributeData[];
}

export interface ISuperAttributeData {
    value: string;
    name: string;
    idProductConcrete?: string | number;
}

export interface IProductResponseLabel {
    id: string;
    type: string;
    attributes: IAvailableLabel;
}

export interface IProductParsedPrices {
    priceOriginalGross?: null;
    priceOriginalNet?: null;
    priceDefaultGross?: null;
    priceDefaultNet?: null;
}
