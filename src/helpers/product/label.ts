import { IAvailableLabelsCollection, TLabelId } from '@interfaces/searchPageData';
import { IProductLabel } from '@interfaces/product';

export const getProductLabelCollection = (
    labelsIdArr: TLabelId[] | null,
    availableLabels: IAvailableLabelsCollection | null,
): IProductLabel[] | null => {
    const isLabelsExist = (Array.isArray(labelsIdArr) && labelsIdArr.length > 0);
    const labels = isLabelsExist
        ? labelsIdArr.map((labelId: TLabelId) => {
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
    labelsIdArr: TLabelId[] | null,
    availableLabels: IAvailableLabelsCollection | null
): IProductLabel[] | null => {
    const labels = getProductLabelCollection(labelsIdArr, availableLabels);
console.log(labels);
    if (!labels) {
        return null;
    }

    return labels;
};
