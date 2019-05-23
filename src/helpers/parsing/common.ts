import { IProductLabel, IProductPrices, IProductImage } from '@interfaces/product';
import { priceTypeNameDefault, priceTypeNameOriginal } from '@constants/product';
import { IProductRelationsIncluded } from '@helpers/parsing/productRelations/types';
import {
    IProductRowLabelsResponse,
    IProductAvailableLabelsCollection,
    IProductImageSetsRawResponse,
    IProductPricesResponse,
    IProductCardImagesResponse
} from '@services/pages/product/types';

export const parseImageSets = (imageSets: IProductImageSetsRawResponse[]): IProductImage[] | null => {
    if (!Array.isArray(imageSets) || !imageSets.length) {
        return null;
    }

    const images = imageSets.reduce((acc, set: IProductImageSetsRawResponse) =>
        acc.concat(set.images.map((imgs: IProductCardImagesResponse) => imgs)), []);

    return images.map((element: IProductCardImagesResponse, index: number) => ({
        id: index,
        src: element.externalUrlLarge,
        srcSmall: element.externalUrlSmall
    }));
};

export const getProductLabel = (
    labelsIdArr: string[] | null,
    availableLabels: IProductAvailableLabelsCollection | null
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

export const parsePrices = (prices: IProductPricesResponse[]): IProductPrices =>
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

export const getAvailableLables = (included: IProductRelationsIncluded[]): IProductAvailableLabelsCollection | null => {
    const availableLabels: IProductAvailableLabelsCollection | null = {};
    const productLabelsType = 'product-labels';

    const includedLabels: IProductRowLabelsResponse[] = included.filter(item => (
        item.type === productLabelsType
    ));

    includedLabels.forEach((label: IProductRowLabelsResponse) => {
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
