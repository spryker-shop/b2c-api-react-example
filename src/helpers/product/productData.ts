import { absentProductType, IProductCardImages, IProductPropFullData } from '@interfaces/product';

export const getCurrentProductDataObject = (
    abstractProduct: IProductPropFullData,
    concreteProduct: IProductPropFullData | null
): IProductPropFullData => {

    let images: IProductCardImages[] = null;
    if (concreteProduct && concreteProduct.images && concreteProduct.images.length) {
        images = concreteProduct.images;
    } else if (abstractProduct.images && abstractProduct.images.length) {
        images = abstractProduct.images;
    }

    const getCurrentAvailability = concreteProduct ? concreteProduct : abstractProduct;

    return {
        sku: concreteProduct ? concreteProduct.sku : null,
        name: concreteProduct ? concreteProduct.name : abstractProduct.name,
        images,
        availability: getCurrentAvailability ? getCurrentAvailability.availability : false,
        description: concreteProduct ? concreteProduct.description : abstractProduct.description,
        price: concreteProduct ? concreteProduct.price : null,
        prices: concreteProduct ? concreteProduct.prices : null,
        priceOriginalGross: concreteProduct ? concreteProduct.priceOriginalGross : null,
        priceOriginalNet: concreteProduct ? concreteProduct.priceOriginalNet : null,
        priceDefaultGross: concreteProduct ? concreteProduct.priceDefaultGross : null,
        priceDefaultNet: concreteProduct ? concreteProduct.priceDefaultNet : null,
        attributes: concreteProduct ? concreteProduct.attributes : abstractProduct.attributes,
        attributeNames: concreteProduct ? concreteProduct.attributeNames : abstractProduct.attributeNames,
        quantity: concreteProduct ? concreteProduct.quantity : abstractProduct.quantity,
        productType: concreteProduct ? concreteProduct.productType : absentProductType,
    };
};
