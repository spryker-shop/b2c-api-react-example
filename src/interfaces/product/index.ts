export type TConcreteProductType = 'concreteProduct';
export type TAbstractProductType = 'abstractProduct';
export type TAbsentProductType = 'absentProduct';
export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;

export interface IProductCard {
    image?: string | null;
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPrices;
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

export interface IProductPropFullData {
    description: string | null;
    descriptionAttributes: IDescriptionAttributes[] | null;
    images: IProductImage[] | null;
    name: string | null;
    prices: IProductPrices;
    sku: string | null;
    productType: TProductType | null;
    availability: boolean | null;
    quantity?: number | null;
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
