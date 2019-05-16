import { IProductAttributeMap, IProductAttributeNames, IProductAttributes } from '@interfaces/product';
import { ISuperAttribute, ISuperAttributeData } from '@helpers/product/types';

export const parseSuperAttributes = (
    superAttributes: IProductAttributeMap,
    attributeNamesContainer: IProductAttributeNames
): ISuperAttribute[] | null => {
    if (!superAttributes.super_attributes || typeof superAttributes.super_attributes !== 'object') {
        return null;
    }

    const names = Object.keys(superAttributes.super_attributes);
    const superData: ISuperAttribute[] = [];

    names.forEach(name => {
        const data: ISuperAttributeData[] = [];
        const values = superAttributes.super_attributes[name];

        values.forEach((value: string) => {
            data.push({
                value,
                name: value,
            });
        });

        superData.push({
                name,
                nameToShow: attributeNamesContainer[name] ? attributeNamesContainer[name] : name,
                data
            }
        );
    });

    return superData;
};

export const getInitialSuperAttrSelected = (superAttributes: ISuperAttribute[]): IProductAttributes | null => {
    const attributes = [...superAttributes];

    if (!attributes.length) {
        return null;
    }

    const superAttrSelected: IProductAttributes = {};
    const selectedAttrNames = attributes.map((attr: ISuperAttribute) => [attr.name, attr.data[0].value]).reduce(
        (acc: IProductAttributes, current: string[]) => {
            acc[current[0]] = current[1];

            return acc;
        }, superAttrSelected
    );

    return selectedAttrNames;
};
