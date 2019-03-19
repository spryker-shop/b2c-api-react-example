import { defaultItemValueDropdown, IProductAttributeMap, IProductAttributes } from '@interfaces/product';

// Created path from object of superAttrSelected
export const createPathToIdProductConcrete = (selected: IProductAttributes) => {
    const path: string[] = [];
    let isAllSuperAttrSelected: boolean = true;

    // Create path to id_product_concrete if all fields in superAttrSelected is NOT empty
    for (const prop in selected) {
        if (!selected[prop] || selected[prop] === defaultItemValueDropdown) {
            isAllSuperAttrSelected = false;
            continue;
        }
        path.push(`${prop}:${selected[prop]}`);
    }

    if (!isAllSuperAttrSelected) {
        return false;
    }

    return path;
};

export const findIdProductConcreteByPath = (
    path: string[],
    attribute_variants: IProductAttributeMap['attribute_variants']
): string => {
    const variants = {...attribute_variants};
    const id = path.reduce((acc: any, key: string) => {
        if (acc[key] && acc[key].id_product_concrete) {
            return acc[key].id_product_concrete;
        }

        return acc[key];
    }, variants);

    return id;
};
