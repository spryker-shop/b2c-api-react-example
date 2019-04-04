import { ISuperAttribute } from '@helpers/product/types';

export interface IProductSuperAttributeProps {
    productData: ISuperAttribute[] | null;

    onChange(selectedData: { name: string, value: string }): void;
}

export interface IProductSuperAttributeState {
    selectedValues: {
        [name: string]: string;
    } | null;
}
