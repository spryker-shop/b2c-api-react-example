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
        price: getCurrentProduct ? getCurrentProduct.price : null,
        prices: getCurrentProduct ? getCurrentProduct.prices : null,
        priceOriginalGross: getCurrentProduct ? getCurrentProduct.priceOriginalGross : null,
        priceOriginalNet: getCurrentProduct ? getCurrentProduct.priceOriginalNet : null,
        priceDefaultGross: getCurrentProduct ? getCurrentProduct.priceDefaultGross : null,
        priceDefaultNet: getCurrentProduct ? getCurrentProduct.priceDefaultNet : null,
        attributes: concreteProduct ? concreteProduct.attributes : abstractProduct.attributes,
        attributeNames: concreteProduct ? concreteProduct.attributeNames : abstractProduct.attributeNames,
        quantity: concreteProduct ? concreteProduct.quantity : abstractProduct.quantity,
        productType: concreteProduct ? concreteProduct.productType : absentProductType,
    };
};
