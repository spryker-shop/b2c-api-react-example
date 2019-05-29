import { IProductLabel, IProductPrices, IProductImage } from '@interfaces/product';
import { priceTypeNameDefault, priceTypeNameOriginal } from '@constants/product';
import { IProductRelationsIncluded } from '@services/common/ProductRelations/types';
import {
    EIncludeTypes,
    IProductLabelsRowIncludedResponse,
    IProductLabelsCollectionResponse,
    IProductImageSetsRawResponse,
    IProductPricesResponse,
    IProductCardImagesResponse
} from '@services//types';

export const parseImageSets = (imageSets: IProductImageSetsRawResponse[]): IProductImage[] => {
    if (!Array.isArray(imageSets) || !imageSets.length) {
        return null;
    }

    const images: IProductCardImagesResponse[] =
        imageSets.reduce((accumulator: IProductCardImagesResponse[], set: IProductImageSetsRawResponse) =>
            accumulator.concat(set.images.map((imgs: IProductCardImagesResponse) => imgs)), []);

    return images.map((element: IProductCardImagesResponse, index: number) => ({
        id: index,
        src: element.externalUrlLarge,
        srcSmall: element.externalUrlSmall
    }));
};

export const getProductLabel = (
    labelsIdArr: string[],
    availableLabels: IProductLabelsCollectionResponse
): IProductLabel[] => {
    const isLabelsExist: boolean = Array.isArray(labelsIdArr) && labelsIdArr.length > 0;

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
    prices.reduce((accumulator: { [key: string]: number }, priceData) => {
        if (priceData.priceTypeName === priceTypeNameDefault) {
            accumulator['priceDefaultGross'] = priceData.grossAmount;
            accumulator['priceDefaultNet'] = priceData.netAmount;
        }

        if (priceData.priceTypeName === priceTypeNameOriginal) {
            accumulator['priceOriginalGross'] = priceData.grossAmount;
            accumulator['priceOriginalNet'] = priceData.netAmount;
        }

        return accumulator;
    }, {});

export const getAvailableLables = (included: IProductRelationsIncluded[]): IProductLabelsCollectionResponse => {
    const availableLabels: IProductLabelsCollectionResponse = {};

    const includedLabels: IProductLabelsRowIncludedResponse[] = included.filter(item => (
        item.type === EIncludeTypes.PRODUCT_LABELS
    ));

    includedLabels.forEach((label: IProductLabelsRowIncludedResponse) => {
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
