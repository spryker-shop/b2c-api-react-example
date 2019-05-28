import { IBreadcrumbItem, ICategory } from '@interfaces/common';
import { pathCategoryPageBase } from '@constants/routes';

export const getCategoryNameById = (categoryId: string | number, categoriesTree: ICategory[]): string | null => {
    if (!categoryId) {
        return null;
    }
    if (!Array.isArray(categoriesTree) || !categoriesTree.length) {
        return null;
    }
    const categoryIdNumbered = Number(categoryId);
    let name: string | null = null;

    categoriesTree.forEach((category: ICategory) => {
        if (name) {
            return;
        }
        if (categoryIdNumbered === category.nodeId) {
            name = category.name;
        } else if (Array.isArray(category.children) && category.children.length && category.children.length > 0) {
            name = getCategoryNameById(categoryIdNumbered, category.children);
        }
    });

    return name;
};

export const getCategoryIdByName = (categoryName: string, categoriesTree: ICategory[]): number | null => {
    if (!categoryName) {
        return null;
    }
    if (!Array.isArray(categoriesTree) || !categoriesTree.length) {
        return null;
    }

    let id: number | null = null;

    categoriesTree.forEach((category: ICategory) => {
        if (id) {
            return;
        }
        if (categoryName === category.name) {
            id = category.nodeId;
        } else if (Array.isArray(category.children) && category.children.length && category.children.length > 0) {
            id = getCategoryIdByName(categoryName, category.children);
        }
    });

    return id;
};

export const getCurrentCategoriesTree = (categoriesTree: ICategory[], categoryId: number): IBreadcrumbItem[] | null => {
    if (!categoryId) {
        return null;
    }

    for (let i = 0; i < categoriesTree.length; i++) {
        if (categoriesTree[i].nodeId.toString() === String(categoryId)) {
            return [{
                name: categoriesTree[i].name,
                path: `${pathCategoryPageBase}/${categoriesTree[i].nodeId}`,
                current: true
            }];
        }

        const arrayCategoryParents = getCurrentCategoriesTree(categoriesTree[i].children as ICategory[], categoryId);

        if (arrayCategoryParents != null) {
            arrayCategoryParents.unshift({
                name: categoriesTree[i].name,
                path: `${pathCategoryPageBase}/${categoriesTree[i].nodeId}`
            });

            return arrayCategoryParents;
        }
    }
};
