import {
    IProductRelationsRawResponse,
    IProductRelationsIncluded,
    IProductRelationsItemResponse,
    IProductOptionsResponse
} from '@services/common/ProductRelations/types';
import { IProductRelationsItem } from '@interfaces/product';
import { parseImageSets, getProductLabel, getAvailableLables, parsePrices } from '@helpers/parsing/common';
import { IProductLabelsCollectionResponse, IProductAvailableLabelResponse } from '@services/types';

export const parsePorductRelationsResponse = (response: IProductRelationsRawResponse): IProductRelationsItem[] =>
    response.data.map((item: IProductRelationsItemResponse) => ({
        name: String(item.attributes.name),
        sku: String(item.attributes.sku),
        ...parseRelationships(response.included, item)
    }));

const parseRelationships = (
    included: IProductRelationsIncluded[],
    item: IProductRelationsItemResponse
): IProductOptionsResponse => {
    if (!item.relationships && !item.relationships.length) {
        return {};
    }

    let productOptions: IProductOptionsResponse = {};
    const availableLabels: IProductLabelsCollectionResponse | null = getAvailableLables(included);

    for (const optionType in item.relationships) {
        const optionId: string = item.relationships[optionType].data[0].id;
        const option: IProductRelationsIncluded = included.find(item => (
            item.id === optionId && item.type === optionType
        ));

        if (optionType === 'product-labels' && availableLabels) {
            const labelsIdArr: string[] = item.relationships[optionType].data
                .map((item: IProductAvailableLabelResponse) => item.id);
            productOptions.label = getProductLabel(labelsIdArr, availableLabels);

            continue;
        }

        productOptions = parseIncludedOptions(option, productOptions, optionType);
    }

    return productOptions;
};

const parseIncludedOptions = (
    option: IProductRelationsIncluded,
    productOptions: IProductOptionsResponse,
    optionType: string
): IProductOptionsResponse => {
    switch (optionType) {
        case 'abstract-product-image-sets':
            productOptions.image = parseImageSets(option.attributes.imageSets)[0].src;
            break;
        case 'abstract-product-prices':
            productOptions.price = option.attributes.price;
            productOptions.prices = parsePrices(option.attributes.prices);
            break;
        default:
            break;
    }

    return productOptions;
};
