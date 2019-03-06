import { IProductRelationsRawResponse, IProductRelationsIncluded, IProductRelationsItemResponse } from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';

import { parseImageSets } from '@helpers/product/imageSetsParser';

const parseIncludedOptions = (included: IProductRelationsIncluded[], id: string) => {
    const productOptions = {};

    included.filter(item => item.id === id).forEach(option => {
        switch (option.type) {
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
    });

    return productOptions;
};

export const parsePorductRelationsRequest = (response: IProductRelationsRawResponse): IProductRelationsItem[] => {
    const parsedProductRelations: IProductRelationsItem[] = [];

    response.data.forEach((item: IProductRelationsItemResponse) => {
        const product: IProductRelationsItem = {
            name: String(item.attributes.name),
            sku: String(item.attributes.sku),
            ...parseIncludedOptions(response.included, item.id)
        };

        parsedProductRelations.push(product);
    });

    return parsedProductRelations;
};
