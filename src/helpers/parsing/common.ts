import {
    IProductCardImages,
    IProductImageSetsRawResponse,
    IProductLabel,
    IProductPricesItem,
    IProductResponseLabel,
    priceTypeNameDefault,
    priceTypeNameOriginal,
    TProductImageSetsCollectionRawResponse
} from '@interfaces/product';
import { IProductImage } from '@components/ProductImageSlider/types';
import { IAvailableLabelsCollection } from '@interfaces/search';
import { IProductRelationsIncluded } from '@helpers/parsing/productRelations/types';

export const parseImageSets = (imageSets: TProductImageSetsCollectionRawResponse): IProductImage[] | null => {
    if (!Array.isArray(imageSets) || !imageSets.length) {
        return null;
    }

    const images = imageSets.reduce((acc, set: IProductImageSetsRawResponse) =>
        acc.concat(set.images.map((imgs: IProductCardImages) => imgs)), []);

    return images.map((element: IProductCardImages, index: number) => ({
        id: index,
        src: element.externalUrlLarge,
        srcSmall: element.externalUrlSmall
    }));
};

export const getProductLabel = (
    labelsIdArr: string[] | null,
    availableLabels: IAvailableLabelsCollection | null
): IProductLabel[] | null => {
    const isLabelsExist = (Array.isArray(labelsIdArr) && labelsIdArr.length > 0);

    return isLabelsExist
        ? labelsIdArr.map((labelId: string) => {
            if (availableLabels[labelId]) {
                return {
                    type: availableLabels[labelId].id,
                    text: availableLabels[labelId].name,
                    position: availableLabels[labelId].position
                };
            }
        })
        : null;
};

export const parsePrices = (prices: IProductPricesItem[]) =>
    prices.reduce((acc: { [key: string]: number }, priceData) => {
        if (priceData.priceTypeName === priceTypeNameDefault) {
            acc['priceDefaultGross'] = priceData.grossAmount;
            acc['priceDefaultNet'] = priceData.netAmount;
        }

        if (priceData.priceTypeName === priceTypeNameOriginal) {
            acc['priceOriginalGross'] = priceData.grossAmount;
            acc['priceOriginalNet'] = priceData.netAmount;
        }

        return acc;
    }, {});

export const getAvailableLables = (included: IProductRelationsIncluded[]): IAvailableLabelsCollection | null => {
    const availableLabels: IAvailableLabelsCollection | null = {};
    const productLabelsType = 'product-labels';

    const includedLabels: IProductResponseLabel[] = included.filter(item => (
        item.type === productLabelsType
    ));

    includedLabels.forEach((label: IProductResponseLabel) => {
        availableLabels[label.id] = {
            id: label.id,
            frontEndReference: label.attributes.frontEndReference,
            isExclusive: label.attributes.isExclusive,
            name: label.attributes.name,
            position: label.attributes.position
        };
    });

    return availableLabels;
};
