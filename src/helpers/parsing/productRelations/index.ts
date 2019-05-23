import {
    IProductRelationsRawResponse,
    IProductRelationsIncluded,
    IProductRelationsItemResponse,
    IProductOptions
} from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { parseImageSets, getProductLabel, getAvailableLables } from '@helpers/parsing/common';
import { IProductAvailableLabelsCollection, IProductAvailableLabel } from '@services/pages/Product/types';

export const parsePorductRelationsResponse = (response: IProductRelationsRawResponse): IProductRelationsItem[] => {
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
    const availableLabels: IProductAvailableLabelsCollection | null = getAvailableLables(included);

    for (const optionType in item.relationships) {
        const optionId: string = item.relationships[optionType].data[0].id;
        const option: IProductRelationsIncluded = included.find(item => (
            item.id === optionId && item.type === optionType
        ));

        if (optionType === 'product-labels' && availableLabels) {
            const labelsIdArr: string[] = item.relationships[optionType].data
                .map((item: IProductAvailableLabel) => item.id);
            productOptions.label = getProductLabel(labelsIdArr, availableLabels);

            continue;
        }

        productOptions = parseIncludedOptions(option, productOptions, optionType);
    }

    return productOptions;
};

const parseIncludedOptions = (
    option: IProductRelationsIncluded,
    productOptions: IProductOptions,
    optionType: string
): IProductOptions => {
    switch (optionType) {
        case 'abstract-product-image-sets':
            productOptions.image = parseImageSets(option.attributes.imageSets)[0].src;
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
