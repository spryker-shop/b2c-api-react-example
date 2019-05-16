import { absentProductType, IProductCardImages, IProductPropFullData } from '@interfaces/product';

export const parseCurrentProductDataObject = (
    abstractProduct: IProductPropFullData,
    concreteProduct: IProductPropFullData | null,
    initialFlag?: boolean
): IProductPropFullData => {

    let images: IProductCardImages[] = null;
    if (concreteProduct && concreteProduct.images && concreteProduct.images.length) {
        images = concreteProduct.images;
    } else if (abstractProduct.images && abstractProduct.images.length) {
        images = abstractProduct.images;
    }

    const getCurrentProduct = initialFlag ? abstractProduct : concreteProduct;

    return {
        sku: getCurrentProduct ? getCurrentProduct.sku : null,
        name: concreteProduct ? concreteProduct.name : abstractProduct.name,
        images,
        availability: getCurrentProduct ? getCurrentProduct.availability : false,
        description: concreteProduct ? concreteProduct.description : abstractProduct.description,
        prices: getCurrentProduct ? getCurrentProduct.prices : null,
        attributes: concreteProduct ? concreteProduct.attributes : abstractProduct.attributes,
        quantity: concreteProduct ? concreteProduct.quantity : abstractProduct.quantity,
        productType: concreteProduct ? concreteProduct.productType : absentProductType,
        descriptionAttributes: concreteProduct ? concreteProduct.descriptionAttributes : abstractProduct.descriptionAttributes
    };
};
