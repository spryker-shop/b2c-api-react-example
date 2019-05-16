import { IProductAttributeMap, IProductAttributes } from '@interfaces/product';

export const findIdProductConcreteByPath = (
    path: string[],
    attribute_variants: IProductAttributeMap['attribute_variants']
): string => {
    // console.log(path, attribute_variants, 'attribute_variantsattribute_variantsattribute_variantsattribute_variantsattribute_variants');
    const variants = {...attribute_variants};
    const id = path.reduce((acc: any, key: string) => {
        // console.log(acc, key);
        if (acc[key] && acc[key].id_product_concrete) {
            // console.log(acc[key].id_product_concrete, 'acc[key].id_product_concrete');
            return acc[key].id_product_concrete;
        }

        return acc[key];
    }, variants);

    return id;
};
