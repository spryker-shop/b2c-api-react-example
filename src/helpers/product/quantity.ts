import { IMenuItemSelect } from '@application/components/UI/SprykerSelect/types';

export const createQuantityVariants = (quantity: number | null): IMenuItemSelect[] | null => {
    if (!quantity) {
        return null;
    }

    const arr = Array(quantity);

    for (let ii = 0; ii < quantity; ii++) {
        arr[ii] = ii + 1;
    }

    const data: IMenuItemSelect[] = [];

    arr.forEach((value: string) => {
        data.push(
            {
                value,
                name: value,
            },
        );
    });

    return data;
};
