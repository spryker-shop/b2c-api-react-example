import { absentProductType, IProductPropFullData } from '@interfaces/product';
import { IProductImage } from '@components/ProductImageSlider/types';

export const parseCurrentProductDataObject = (
    abstractProduct: IProductPropFullData,
    concreteProduct: IProductPropFullData | null
): IProductPropFullData => {

    let images: IProductImage[] = null;
    if (concreteProduct && concreteProduct.images && concreteProduct.images.length) {
        images = concreteProduct.images;
    } else if (abstractProduct.images && abstractProduct.images.length) {
        images = abstractProduct.images;
    }

    return {
        sku: concreteProduct ? concreteProduct.sku : null,
        name: concreteProduct ? concreteProduct.name : abstractProduct.name,
        images,
        availability: concreteProduct ? concreteProduct.availability : false,
        description: concreteProduct ? concreteProduct.description : abstractProduct.description,
        prices: concreteProduct ? concreteProduct.prices : null,
        quantity: concreteProduct ? concreteProduct.quantity : abstractProduct.quantity,
        productType: concreteProduct ? concreteProduct.productType : absentProductType,
        descriptionAttributes: concreteProduct ? concreteProduct.descriptionAttributes :
            abstractProduct.descriptionAttributes
    };
};
