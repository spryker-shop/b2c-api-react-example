import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { CategoryItem } from '@application/pages/SearchPage/CategoryItem';
import { AppPageSubTitle } from '@application/components/AppPageSubTitle';
import {
    IActiveFilterCategories,
    ICategoriesListProps
} from '@application/pages/SearchPage/CategoriesList/types';
import { styles } from './styles';
import { ICategory } from '@interfaces/category';
import { getFormattedActiveCategories } from '@application/pages/SearchPage/helpers';
import { FormattedMessage } from 'react-intl';

export const CategoriesListBase: React.SFC<ICategoriesListProps> = (
    {classes, categories, categoriesTree, selectedCategory, localizedName},
) => {

    if (!Array.isArray(categories) || !categories.length) {
        return null;
    }
    const activeCategories = getFormattedActiveCategories(categories);

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

export const CategoriesList = withStyles(styles)(CategoriesListBase);
