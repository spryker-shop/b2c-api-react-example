import { IAvailableLabelsCollection } from '@interfaces/search';
import { IProductLabel } from '@interfaces/product';

export const getProductLabelCollection = (
    labelsIdArr: string[] | null,
    availableLabels: IAvailableLabelsCollection | null,
): IProductLabel[] | null => {
    const isLabelsExist = (Array.isArray(labelsIdArr) && labelsIdArr.length > 0);
    const labels = isLabelsExist
        ? labelsIdArr.map((labelId: string) => {
            if (availableLabels[labelId]) {
                return {
                    type: availableLabels[labelId].id,
                    text: availableLabels[labelId].name,
                    position: availableLabels[labelId].position,
                };
            }
        })
        : null;

    return labels;
};

export const getProductLabel = (
    labelsIdArr: string[] | null,
    availableLabels: IAvailableLabelsCollection | null
): IProductLabel[] | null => {
    const labels = getProductLabelCollection(labelsIdArr, availableLabels);

    if (!labels) {
        return null;
    }

    return labels;
};
