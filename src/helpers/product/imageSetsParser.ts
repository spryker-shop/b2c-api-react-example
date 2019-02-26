import {
    IProductCardImages,
    IProductImageSetsRawResponse,
    TProductImageSetsCollectionRawResponse,
    TProductImageSRC
} from '@interfaces/product';

export const parseImageSets = (imageSets: TProductImageSetsCollectionRawResponse): IProductCardImages[] | null => {
    if (!Array.isArray(imageSets) || !imageSets.length) {
        return null;
    }

    const result: IProductCardImages[] = [];

    imageSets.map((set: IProductImageSetsRawResponse) => {
        set.images.forEach((imgs: IProductCardImages) => {
            result.push(imgs);
        });
    });

    return result;
};

export const getOneProductImage = (images: IProductCardImages[]): TProductImageSRC | null => {
    if (!Array.isArray(images)) {
        return null;
    }

    const result = (images && images.length)
        ? (images[0].externalUrlSmall || null)
        : null;

    return result;
};
