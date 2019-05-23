import { IProductAttributes, IProductLabel, IProductPropFullData, ISuperAttribute } from '@interfaces/product';

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
