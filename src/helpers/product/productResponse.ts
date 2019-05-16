import { parseImageSets, parseSuperAttributes } from '.';
import {
    abstractProductType,
    concreteProductType,
    IConcreteProductAvailability,
    IProductAttributeNames,
    IProductDataParsed,
    IProductPricesItem,
    priceTypeNameDefault,
    priceTypeNameOriginal,
    IProductPropFullData
} from '@interfaces/product';
import {
    IProductAvailabilitiesRawResponse,
    IProductRawResponse,
    IRowProductLabelsResponse,
    TRowProductResponseIncluded
} from '@helpers/product/types';
import { IProductLabelResponse } from '@interfaces/searchPageData';

const defaultProductQuantity = 10;

export const parseProductResponse = (response: IProductRawResponse): IProductDataParsed | null => {
    if (!response) {
        return null;
    }

    const initialProductData: IProductPropFullData = {
        sku: null,
        name: null,
        description: null,
        descriptionAttributes: null,
        images: null,
        prices: {
            priceOriginalGross: null,
            priceOriginalNet: null,
            priceDefaultGross: null,
            priceDefaultNet: null,
        },
        availability: null,
        quantity: null,
        productType: null
    };
    const { data, included } = response;
    const result: IProductDataParsed = {
        attributeVariants: data.attributes.attributeMap.attribute_variants,
        superAttributes: null,
        abstractProduct: {
            ...initialProductData,
            sku: data.attributes.sku,
            name: data.attributes.name,
            description: data.attributes.description,
            attributes: data.attributes.attributes,
            attributeNames: data.attributes.attributeNames,
            productType: abstractProductType
        },
        concreteProducts: {},
        productLabels: []
    };

    result.abstractProduct.descriptionAttributes =
        parseDescriptionAttributes(data.attributes.attributeNames, data.attributes.attributes);

    // console.log(data, included);

    let attributeNamesContainer: IProductAttributeNames = {};

    if (data.attributes.attributeMap.product_concrete_ids) {
        data.attributes.attributeMap.product_concrete_ids.forEach((id: string) => {
            result.concreteProducts[id] = {
                ...initialProductData,
                productType: concreteProductType
            };
        });
    }

    included.forEach((row: TRowProductResponseIncluded) => {
        if (row.type === 'abstract-product-image-sets') {
            result.abstractProduct.images = parseImageSets(row.attributes.imageSets);

            return;
        }
        if (row.type === 'abstract-product-prices') {
            if (row.attributes.prices && row.attributes.prices.length) {
                result.abstractProduct.prices = parsePrices(row.attributes.prices);
            }

            return;
        }
        if (row.type === 'abstract-product-availabilities') {
            result.abstractProduct.availability = row.attributes.availability;
            result.abstractProduct.quantity = row.attributes.quantity;

            return;
        }
        if (row.type === 'concrete-products' && !result.concreteProducts[row.id].name) {
            result.concreteProducts[row.id].name = row.attributes.name;
            result.concreteProducts[row.id].sku = row.attributes.sku;
            result.concreteProducts[row.id].description = row.attributes.description;
            result.concreteProducts[row.id].descriptionAttributes =
                parseDescriptionAttributes(row.attributes.attributeNames, row.attributes.attributes);
            attributeNamesContainer = { ...attributeNamesContainer, ...row.attributes.attributeNames };

            return;
        }
        if (row.type === 'concrete-product-image-sets' && !result.concreteProducts[row.id].images) {
            result.concreteProducts[row.id].images = parseImageSets(row.attributes.imageSets);

            return;
        }
        if (row.type === 'concrete-product-prices' && !result.concreteProducts[row.id].price) {
            if (row.attributes.prices && row.attributes.prices.length) {
                result.concreteProducts[row.id].prices = parsePrices(row.attributes.prices);
            }

            return;
        }
        if (row.type === 'concrete-product-availabilities' && !result.concreteProducts[row.id].availability) {
            result.concreteProducts[row.id].availability = row.attributes.availability;
            result.concreteProducts[row.id].quantity = row.attributes.quantity;

            if (row.attributes.isNeverOutOfStock) {
                result.concreteProducts[row.id].availability = true;
                result.concreteProducts[row.id].quantity = defaultProductQuantity;

                result.abstractProduct.availability = true;
                result.abstractProduct.quantity = defaultProductQuantity;
            }
        }
    });
    const filteredIncludedLabels = included.filter(row => row.type === 'product-labels');
    const labelsRelationships = data.relationships['product-labels'];
    const isLabelsExist = labelsRelationships && filteredIncludedLabels.length;

    if (isLabelsExist) {
        const filteredAvailableLabels = labelsRelationships.data.map((item: IProductLabelResponse) => item.id);
        filteredAvailableLabels.forEach(availableLabelId => {
            filteredIncludedLabels.forEach((includedLabel: IRowProductLabelsResponse) => {
                const isLabelExist = availableLabelId === includedLabel.id;
                if (isLabelExist) {
                    const labelData = {
                        type: includedLabel.id,
                        text: includedLabel.attributes.name,
                        position: includedLabel.attributes.position,
                    };
                    result.productLabels.push(labelData);
                }
            });
        });
    }
    result.superAttributes = parseSuperAttributes(data.attributes.attributeMap, attributeNamesContainer);

    return result;
};

const parseDescriptionAttributes = (attributeNames, attributeValues) => Object.keys(attributeNames)
    .filter(attributeKey => Boolean(attributeValues[attributeKey])).map(attributeKey => ({
        name: attributeNames[attributeKey],
        value: attributeValues[attributeKey]
    }));

const parsePrices = (prices) => {
    let pricesObject = {};

    prices.forEach((priceData: IProductPricesItem) => {
        if (priceData.priceTypeName === priceTypeNameDefault) {
            pricesObject = {
                ...pricesObject,
                priceDefaultGross: priceData.grossAmount,
                priceDefaultNet: priceData.netAmount
            };
        }
        if (priceData.priceTypeName === priceTypeNameOriginal) {
            pricesObject = {
                ...pricesObject,
                priceOriginalGross: priceData.grossAmount,
                priceOriginalNet: priceData.netAmount
            };
        }
    });

    return pricesObject;
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
