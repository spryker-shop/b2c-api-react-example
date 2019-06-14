export type TConcreteProductType = 'concreteProduct';
export type TAbstractProductType = 'abstractProduct';
export type TAbsentProductType = 'absentProduct';
export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;

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

export interface IProductPropFullData {
    description: string;
    descriptionAttributes: IDescriptionAttributes[];
    images: IProductImage[];
    name: string;
    prices: IProductPrices;
    sku: string;
    productType: TProductType;
    isAvailable: boolean;
    quantity?: number;
}

export interface IProductCard {
    image?: string;
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPrices;
    labels?: IProductLabel[];
}

export interface IProductRelationsItem {
    name: string;
    sku: string;
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPrices;
    image?: string;
}

export interface IProductAttributeMap {
    attribute_variants: { [key: string]: IProductAttributes };
    product_concrete_ids: string[];
    super_attributes: { [key: string]: string[] };
}

export interface IProductAttributes {
    [key: string]: string | number;
}

export type IProductImage = {
    id: number;
    src: string;
    srcSmall?: string;
};

export interface IProductLabel {
    type: string;
    text: string;
    position: number;
}

export interface IDescriptionAttributes {
    name: string;
    value: string | number;
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

export interface IProductPrices {
    priceOriginalGross?: null;
    priceOriginalNet?: null;
    priceDefaultGross?: null;
    priceDefaultNet?: null;
}
