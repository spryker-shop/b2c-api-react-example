import { IProductAttributes, TProductName } from '@interfaces/product';

export const displayProductNameWithSuperAttr = (
    name: TProductName,
    superAttrSelected: IProductAttributes,
): string => {
    let addName: string = '';

    if (!superAttrSelected) {
        return name;
    }

    // Adding additional params as names
    let i = 0;
    const divider = ', ';
    addName += '(';
    for (const prop in superAttrSelected) {
        if (!superAttrSelected[prop]) {
            continue;
        }

        if (i > 0) {
            addName += divider;
        }

        addName += `${prop}: ${superAttrSelected[prop]}`;
        i += 1;
    }
    addName += ')';

    return `${name} ${addName}`;
};
