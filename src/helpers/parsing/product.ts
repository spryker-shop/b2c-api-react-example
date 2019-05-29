import {
    IProductPropFullData,
    IProductAttributeMap,
    IProductAttributes,
    ISuperAttribute,
    IDescriptionAttributes,
    IProductDataParsed
} from '@interfaces/product';
import { abstractProductType, concreteProductType, defaultProductQuantity } from '@constants/product';
import { IProductRawResponse, TProductRowIncludedResponse } from '@services/pages/Product/types';
import { IIndexSignature } from '@interfaces/common';
import { parseImageSets, parsePrices } from '@helpers/parsing/common';
import { IProductLabelsRowIncludedResponse, EIncludeTypes, IRelationshipsDataResponse } from '@services/types';

export const parseProductResponse = (response: IProductRawResponse): IProductDataParsed => {
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
            priceDefaultNet: null
        },
        isAvailable: null,
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

    included.forEach((row: TProductRowIncludedResponse) => {
        if (row.type === EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS) {
            result.abstractProduct.images = parseImageSets(row.attributes.imageSets);

            return;
        }
        if (row.type === EIncludeTypes.ABSTRACT_PRODUCT_PRICES) {
            if (row.attributes.prices && row.attributes.prices.length) {
                result.abstractProduct.prices = parsePrices(row.attributes.prices);
            }

            return;
        }
        if (row.type === EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES) {
            result.abstractProduct.isAvailable = row.attributes.availability;
            result.abstractProduct.quantity = row.attributes.quantity;

            return;
        }
        if (row.type === EIncludeTypes.CONCRETE_PRODUCTS && !result.concreteProducts[row.id].name) {
            result.concreteProducts[row.id].name = row.attributes.name;
            result.concreteProducts[row.id].sku = row.attributes.sku;
            result.concreteProducts[row.id].description = row.attributes.description;
            result.concreteProducts[row.id].descriptionAttributes =
                parseDescriptionAttributes(row.attributes.attributeNames, row.attributes.attributes);
            attributeNamesContainer = { ...attributeNamesContainer, ...row.attributes.attributeNames };

            return;
        }
        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS && !result.concreteProducts[row.id].images) {
            result.concreteProducts[row.id].images = parseImageSets(row.attributes.imageSets);

            return;
        }
        if (
            row.type === EIncludeTypes.CONCRETE_PRODUCT_PRICES && row.attributes.prices && row.attributes.prices.length
        ) {
            result.concreteProducts[row.id].prices = parsePrices(row.attributes.prices);

            return;
        }
        if (
            row.type === EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES && !result.concreteProducts[row.id].isAvailable
        ) {
            result.concreteProducts[row.id].isAvailable = row.attributes.availability;
            result.concreteProducts[row.id].quantity = row.attributes.quantity;

            if (row.attributes.isNeverOutOfStock) {
                result.concreteProducts[row.id].isAvailable = true;
                result.concreteProducts[row.id].quantity = defaultProductQuantity;

                result.abstractProduct.isAvailable = true;
                result.abstractProduct.quantity = defaultProductQuantity;
            }
        }
    });
    const filteredIncludedLabels: TProductRowIncludedResponse[] = included.filter(row =>
        row.type === EIncludeTypes.PRODUCT_LABELS);
    const labelsRelationships: {data: IRelationshipsDataResponse[]} = data.relationships[EIncludeTypes.PRODUCT_LABELS];
    const isLabelsExist: boolean = Boolean(labelsRelationships && filteredIncludedLabels.length);

    if (isLabelsExist) {
        const filteredAvailableLabels: string[] = labelsRelationships.data.map(item => item.id);
        filteredAvailableLabels.forEach((availableLabelId: string) => {
            filteredIncludedLabels.forEach((includedLabel: IProductLabelsRowIncludedResponse) => {
                const isLabelExist: boolean = availableLabelId === includedLabel.id;
                if (isLabelExist) {
                    const labelData = {
                        type: includedLabel.id,
                        text: includedLabel.attributes.name,
                        position: includedLabel.attributes.position
                    };
                    result.productLabels.push(labelData);
                }
            });
        });
    }
    const superAttributes: ISuperAttribute[] = parseSuperAttributes(
        data.attributes.attributeMap, attributeNamesContainer
    );
    result.superAttributes = superAttributes;
    result.selectedAttrNames = superAttributes.map(attr => attr.name).reduce((acc: { [key: string]: string }, name) => {
        acc[name] = null;

        return acc;
    }, {});

    return result;
};

const parseSuperAttributes = (
    superAttributes: IProductAttributeMap,
    attributeNamesContainer: IIndexSignature
): ISuperAttribute[] => {
    if (!superAttributes.super_attributes || typeof superAttributes.super_attributes !== 'object') {
        return null;
    }

    const names: string[] = Object.keys(superAttributes.super_attributes);

    return names.reduce((acc, name) => [
        ...acc,
        {
            name,
            nameToShow: attributeNamesContainer[name],
            data: superAttributes.super_attributes[name]
                .reduce((acc, value) => [...acc, { value, name: value }], [])
        }
    ], []);
};

const parseDescriptionAttributes = (
    attributeNames: IIndexSignature,
    attributeValues: IProductAttributes
): IDescriptionAttributes[] =>
Object.keys(attributeNames).filter(attributeKey => Boolean(attributeValues[attributeKey])).map(attributeKey => ({
    name: attributeNames[attributeKey],
    value: attributeValues[attributeKey]
}));
