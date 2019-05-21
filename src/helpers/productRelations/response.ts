import {
    IProductRelationsRawResponse,
    IProductRelationsIncluded,
    IProductRelationsItemResponse,
    IProductOptions,
    IProductRelationsLabel
} from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { parseImageSets } from '@helpers/product/imageSetsParser';
import { getProductLabel } from '@helpers/product/label';
import { IAvailableLabelsCollection } from '@interfaces/searchPageData';

export const parsePorductRelationsRequest = (response: IProductRelationsRawResponse): IProductRelationsItem[] => {
    const parsedProductRelations: IProductRelationsItem[] = [];

    response.data.forEach((item: IProductRelationsItemResponse) => {
        const product: IProductRelationsItem = {
            name: String(item.attributes.name),
            sku: String(item.attributes.sku),
            ...parseRelationships(response.included, item)
        };

        parsedProductRelations.push(product);
    });

    return parsedProductRelations;
};

const parseRelationships = (included: IProductRelationsIncluded[], item: IProductRelationsItemResponse): object => {
    if (!item.relationships && !item.relationships.length) {
        return {};
    }

    let productOptions: IProductOptions = {};
    const availableLabels: IAvailableLabelsCollection | null = getAvailableLables(included);

    for (const optionType in item.relationships) {
        const optionId: string = item.relationships[optionType].data[0].id;
        const option: IProductRelationsIncluded = included.find(item => (
            item.id === optionId && item.type === optionType
        ));

        if (optionType === 'product-labels' && availableLabels) {
            const labelsIdArr: string[] = item.relationships[optionType].data.map(item => item.id);
            productOptions.label = getProductLabel(labelsIdArr, availableLabels);

            continue;
        }

        productOptions = parseIncludedOptions(option, productOptions, optionType);
    }

    return productOptions;
};

const getAvailableLables = (included: IProductRelationsIncluded[]): IAvailableLabelsCollection | null => {
    const availableLabels: IAvailableLabelsCollection | null = {};
    const productLabelsType = 'product-labels';

    const includedLabels: IProductRelationsLabel[] = included.filter(item => (
        item.type === productLabelsType
    ));

    includedLabels.forEach((label: IProductRelationsLabel) => {
        availableLabels[label.id] = {
            id: label.id,
            frontEndReference: label.attributes.frontEndReference,
            isExclusive: label.attributes.isExclusive,
            name: label.attributes.name,
            position: label.attributes.position,
        };
    });

    return availableLabels;
};

const parseIncludedOptions = (
    option: IProductRelationsIncluded,
    productOptions: IProductOptions,
    optionType: string
): IProductOptions => {
    switch (optionType) {
        case 'abstract-product-image-sets':
            productOptions.images = parseImageSets(option.attributes.imageSets);
            break;
        case 'abstract-product-prices':
            productOptions.price = option.attributes.price;
            productOptions.prices = option.attributes.prices;
            break;
        default:
            break;
    }

    return productOptions;
};
