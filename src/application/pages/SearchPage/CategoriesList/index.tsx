import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ICategory } from '@interfaces/category';
import { IActiveFilterCategories, ICategoriesListProps } from './types';
import { getFormattedActiveCategories } from '../helpers';
import { pathCategoryPageBase } from '@constants/routes';
import { CategoryItem } from './CategoryItem';
import { List, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

export const CategoriesListBase: React.SFC<ICategoriesListProps> = (props): JSX.Element  => {
    const {
        classes,
        categories,
        categoriesTree,
        selectedCategory,
        localizedName,
        locationCategoryId,
        changeLocation,
        setCurrentCategory
    } = props;

    if (!Array.isArray(categories) || !categories.length) {
        return null;
    }

    const activeCategories = getFormattedActiveCategories(categories);

    const selectCategory = (categoryId: number) => (event: React.MouseEvent<HTMLElement>): void => {
        if (locationCategoryId !== categoryId) {
            setCurrentCategory(categoryId);
            changeLocation(`${pathCategoryPageBase}/${categoryId}`);
        }
    };

    const getCategoriesList = (
        data: ICategory[],
        activeData: IActiveFilterCategories,
        selectedId: ICategoriesListProps['selectedCategory']): JSX.Element[] | null => {

        if (!Array.isArray(data) || !data.length) {
            return null;
        }

        return data.map((category: ICategory) => {
            const quantity = (activeData[category.nodeId] ? activeData[category.nodeId] : 0);
            const isSubcategoryExist = Array.isArray(category.children) && category.children.length &&
                category.children.length > 0;

            return (
                <CategoryItem
                    key={`category-${category.nodeId}`}
                    categoryValue={category.nodeId}
                    isSelected={(+selectedId) === category.nodeId}
                    isActive={Boolean(quantity)}
                    selectCategoryHandler={ selectCategory }
                    quantity={quantity}
                    categoryName={`${category.name ? category.name : <FormattedMessage id={ 'no.name.title' } />}`}
                >
                    { Boolean(isSubcategoryExist) &&
                        getCategoriesList(category.children as ICategory[], activeData, selectedCategory)
                    }

                </CategoryItem>
            );
        });
    };

    return (
        <div className={classes.root}>
            <Typography component="h4" variant="display1" color="textSecondary" className={ classes.title }>
                { localizedName ? localizedName : <FormattedMessage id={ 'categories.panel.title' } /> }
            </Typography>
            <List component="nav" className={classes.list}>
                {getCategoriesList(categoriesTree, activeCategories, selectedCategory)}
            </List>
        </div>
    );
};

export const CategoriesList = withStyles(styles)(connect(CategoriesListBase));
