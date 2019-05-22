import {
    abstractProductType,
    concreteProductType,
    IProductDataParsed,
    IProductPropFullData,
    IProductAttributeMap,
    IProductAttributes
} from '@interfaces/product';
import {
    IProductRawResponse,
    IRowProductLabelsResponse,
    ISuperAttribute,
    TRowProductResponseIncluded
} from '@helpers/parsing/product/types';
import { IProductLabelResponse } from '@interfaces/search';
import { IIndexSignature } from '@interfaces/common';
import { parseImageSets, parsePrices } from '@helpers/parsing/common';

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
            productType: abstractProductType
        },
        concreteProducts: {},
        productLabels: [],
        selectedAttrNames: {}
    };

    result.abstractProduct.descriptionAttributes =
        parseDescriptionAttributes(data.attributes.attributeNames, data.attributes.attributes);

    let attributeNamesContainer: IIndexSignature = {};

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
        if (row.type === 'concrete-product-prices' && row.attributes.prices && row.attributes.prices.length) {
            result.concreteProducts[row.id].prices = parsePrices(row.attributes.prices);

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
        filteredAvailableLabels.forEach((availableLabelId: string) => {
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
    const superAttributes = parseSuperAttributes(data.attributes.attributeMap, attributeNamesContainer);
    result.superAttributes = superAttributes;
    result.selectedAttrNames = superAttributes.map(attr => attr.name).reduce((acc: {[key: string]: string}, name) => {
        acc[name] = null;

        return acc;
    }, {});

    return result;
};

const parseSuperAttributes = (
    superAttributes: IProductAttributeMap,
    attributeNamesContainer: IIndexSignature
): ISuperAttribute[] | null => {
    if (!superAttributes.super_attributes || typeof superAttributes.super_attributes !== 'object') {
        return null;
    }

    const names = Object.keys(superAttributes.super_attributes);

    return names.reduce((acc, name) => [
        ...acc,
        {
            name,
            nameToShow: attributeNamesContainer[name],
            data: superAttributes.super_attributes[name]
                .reduce((acc, value) => [ ...acc, { value, name: value, }], [])
        }
    ], []);
};

const parseDescriptionAttributes = (
    attributeNames: IIndexSignature,
    attributeValues: IProductAttributes
) => Object.keys(attributeNames).filter(attributeKey => Boolean(attributeValues[attributeKey])).map(attributeKey => ({
    name: attributeNames[attributeKey],
    value: attributeValues[attributeKey]
}));
