import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ICategory } from '@interfaces/category';
import { IActiveFilterCategories, ICategoriesListProps } from './types';
import { getFormattedActiveCategories } from '../helpers';
import { pathCategoryPageBase } from '@constants/routes';
import { AppPageSubTitle } from '@application/components/AppPageSubTitle';
import { CategoryItem } from './CategoryItem';
import { Grid, List, withStyles } from '@material-ui/core';
import { styles } from './styles';

export const CategoriesListBase: React.SFC<ICategoriesListProps> = (
    {
        classes,
        categories,
        categoriesTree,
        selectedCategory,
        localizedName,
        locationCategoryId,
        changeLocation,
        setCurrentCategory
    }
) => {
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

            return (
                <CategoryItem
                    key={`category-${category.nodeId}`}
                    categoryValue={category.nodeId}
                    isSelected={(+selectedId) === category.nodeId}
                    isActive={Boolean(quantity)}
                    selectCategoryHandler={ selectCategory }
                    displayName={ `${category.name
                        ? category.name
                        : <FormattedMessage id={ 'no.name.title' } />
                    } (${quantity})` }
                >
                    {(Array.isArray(category.children) && category.children.length && category.children.length > 0)
                        ? getCategoriesList(category.children, activeData, selectedCategory)
                        : null
                    }
                </CategoryItem>
            );
        });
    };

    return (
        <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.root}
        >
            <Grid item xs={12}>
                <AppPageSubTitle
                    title={ localizedName ? localizedName : <FormattedMessage id={ 'categories.panel.title' } /> }
                    extraClass={ classes.title }
                />
                <List component="nav" className={classes.list}>
                    {getCategoriesList(categoriesTree, activeCategories, selectedCategory)}
                </List>
            </Grid>
        </Grid>
    );
};

export const CategoriesList = withStyles(styles)(connect(CategoriesListBase));
