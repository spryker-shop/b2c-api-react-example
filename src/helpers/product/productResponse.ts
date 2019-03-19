import { parseImageSets, parseSuperAttributes } from '.';
import {
    abstractProductType,
    concreteProductType,
    IConcreteProductAvailability,
    IProductAttributeNames,
    IProductDataParsed,
    IProductPricesItem,
    priceTypeNameDefault,
    priceTypeNameOriginal
} from '@interfaces/product';
import {
    IProductAvailabilitiesRawResponse, IProductRawResponse,
    TRowProductResponseIncluded
} from '@helpers/product/types';

const defaultProductQuantity = 10;

export const parseProductResponse = (response: IProductRawResponse): IProductDataParsed | null => {
    if (!response) {
        return null;
    }

    const { data, included } = response;
    const result: IProductDataParsed = {
        attributeMap: data.attributes.attributeMap,
        superAttributes: null,
        abstractProduct: {
            sku: data.attributes.sku,
            name: data.attributes.name,
            description: data.attributes.description,
            attributes: data.attributes.attributes,
            attributeNames: data.attributes.attributeNames,
            images: [],
            price: null,
            prices: null,
            priceOriginalGross: null,
            priceOriginalNet: null,
            priceDefaultGross: null,
            priceDefaultNet: null,
            availability: null,
            quantity: null,
            productType: abstractProductType
        },
        concreteProducts: {}
    };
    let attributeNamesContainer: IProductAttributeNames = {};

    // Fill data with concrete products ids
    if (data.attributes.attributeMap.product_concrete_ids) {
        data.attributes.attributeMap.product_concrete_ids.forEach((id: string) => {
            result.concreteProducts[id] = {
                sku: null,
                name: null,
                description: null,
                attributes: null,
                attributeNames: null,
                images: null,
                price: null,
                prices: null,
                priceOriginalGross: null,
                priceOriginalNet: null,
                priceDefaultGross: null,
                priceDefaultNet: null,
                availability: null,
                quantity: null,
                productType: concreteProductType
            };
        });
    }

    included.forEach((row: TRowProductResponseIncluded) => {
        // Abstract part start
        if (row.type === 'abstract-product-image-sets') {
            result.abstractProduct.images = parseImageSets(row.attributes.imageSets);
        } else {
            if (row.type === 'abstract-product-prices') {
                result.abstractProduct.price = row.attributes.price;
                result.abstractProduct.prices = row.attributes.prices;
                if (row.attributes.prices && row.attributes.prices.length) {
                    row.attributes.prices.forEach((priceData: IProductPricesItem) => {
                        if (priceData.priceTypeName === priceTypeNameDefault) {
                            result.abstractProduct.priceDefaultGross = priceData.grossAmount;
                            result.abstractProduct.priceDefaultNet = priceData.netAmount;
                        }
                        if (priceData.priceTypeName === priceTypeNameOriginal) {
                            result.abstractProduct.priceOriginalGross = priceData.grossAmount;
                            result.abstractProduct.priceOriginalNet = priceData.netAmount;
                        }
                    });
                }
            } else {
                if (row.type === 'abstract-product-availabilities') {
                    result.abstractProduct.availability = row.attributes.availability;
                    result.abstractProduct.quantity = row.attributes.quantity;
                    // Abstract part end

                    // Concrete part start
                } else {
                    if (row.type === 'concrete-products' && !result.concreteProducts[row.id].name) {
                        result.concreteProducts[row.id].name = row.attributes.name;
                        result.concreteProducts[row.id].sku = row.attributes.sku;
                        result.concreteProducts[row.id].description = row.attributes.description;
                        result.concreteProducts[row.id].attributes = row.attributes.attributes;
                        result.concreteProducts[row.id].attributeNames = row.attributes.attributeNames;
                        attributeNamesContainer = { ...attributeNamesContainer, ...row.attributes.attributeNames };
                    } else {
                        if (row.type === 'concrete-product-image-sets' && !result.concreteProducts[row.id].images) {
                            result.concreteProducts[row.id].images = parseImageSets(row.attributes.imageSets);
                        } else {
                            if (row.type === 'concrete-product-prices' && !result.concreteProducts[row.id].price) {
                                result.concreteProducts[row.id].price = row.attributes.price;
                                result.concreteProducts[row.id].prices = row.attributes.prices;
                                if (row.attributes.prices && row.attributes.prices.length) {
                                    row.attributes.prices.forEach((priceData: IProductPricesItem) => {
                                        if (priceData.priceTypeName === priceTypeNameDefault) {
                                            result.concreteProducts[row.id].priceDefaultGross = priceData.grossAmount;
                                            result.concreteProducts[row.id].priceDefaultNet = priceData.netAmount;
                                        }
                                        if (priceData.priceTypeName === priceTypeNameOriginal) {
                                            result.concreteProducts[row.id].priceOriginalGross = priceData.grossAmount;
                                            result.concreteProducts[row.id].priceOriginalNet = priceData.netAmount;
                                        }
                                    });
                                }

                            } else {
                                if (
                                    row.type === 'concrete-product-availabilities' &&
                                    !result.concreteProducts[row.id].availability
                                ) {
                                    result.concreteProducts[row.id].availability = row.attributes.availability;
                                    result.concreteProducts[row.id].quantity = row.attributes.quantity;

                                    if (row.attributes.isNeverOutOfStock) {
                                        result.concreteProducts[row.id].availability = true;
                                        result.concreteProducts[row.id].quantity = defaultProductQuantity;

                                        result.abstractProduct.availability = true;
                                        result.abstractProduct.quantity = defaultProductQuantity;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // Concrete part end
    });

    result.superAttributes = parseSuperAttributes(data.attributes.attributeMap, attributeNamesContainer);

    return result;
};

export const parseProductAvailabilityResponse = (response: IProductAvailabilitiesRawResponse):
    IConcreteProductAvailability | null => {
    if (!response) {
        return null;
    }
    const { data } = response;
    if (!data || !data[0] || !data[0].attributes) {
        return null;
    }
    const attributes = data[0].attributes;

    if (attributes.isNeverOutOfStock) {
        attributes.availability = true;
        attributes.quantity = defaultProductQuantity;
    }

    return {
        sku: data[0].id,
        availability: attributes.availability,
        quantity: attributes.quantity
    };
};
