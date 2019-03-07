import {
    IProductRelationsRawResponse,
    IProductRelationsIncluded,
    IProductRelationsItemResponse,
    IProductOptions
} from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';

import { parseImageSets } from '@helpers/product/imageSetsParser';
import { getProductLabel } from '@helpers/product/label';
import { IAvailableLabelsCollection, TLabelId } from '@interfaces/searchPageData';

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

// const parseProductLabel = (
//     included: IProductRelationsIncluded[],
//     option: IProductRelationsIncluded
// ): IProductOptions => {
//     const labelsIdArr: TLabelId[] = option.data.map(item => item.id);
//     const availableLabels: IAvailableLabelsCollection | null = included.forEach(item => item.type === 'product-labels');
//
//     console.log(availableLabels);
//     debugger
//     return getProductLabel(labelsIdArr, availableLabels);
// };

const parseRelationships = (included: IProductRelationsIncluded[], item: IProductRelationsItemResponse): object => {
    if (!item.relationships && !item.relationships.length) {
        return {};
    }

    let productOptions: IProductOptions = {};

    for (const optionType in item.relationships) {
        const optionId: string = item.relationships[optionType].data[0].id;
        const option: IProductRelationsIncluded = included.find(item => (
            item.id === optionId && item.type === optionType
        ));

        // if (optionType === 'product-labels') {
        //     productOptions = parseProductLabel(included, item.relationships[optionType]);
        //
        //     continue;
        // }

        productOptions = parseIncludedOptions(option, productOptions, optionType);
    }

    return productOptions;
};

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
