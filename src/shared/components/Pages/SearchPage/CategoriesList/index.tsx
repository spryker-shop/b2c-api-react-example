import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { styles } from './styles';
import {Category, FilterValue} from "src/shared/interfaces/searchPageData/index";
import {CategoryItem} from "src/shared/components/Pages/SearchPage/CategoryItem/index";
import {TCategoryId} from "src/shared/components/Pages/SearchPage/types";

interface CategoriesListProps extends WithStyles<typeof styles> {
  categories: Array<FilterValue>;
  categoriesTree: Array<Category>;
  selectedCategory: TCategoryId;
}

const title = 'Categories';

export const CategoriesListBase: React.SFC<CategoriesListProps> = (props) => {
  const {
    classes,
    categories,
    categoriesTree,
    selectedCategory,
  } = props;

  if (!Array.isArray(categories) || !categories.length) {
    return null;
  }

  const categoryList = categories.map((category: FilterValue) => {
    let name: string;

    const searchName = (leaf: any) => {
      if (leaf.nodeId === category.value) {
        name = leaf.name;
        return true;
      }
      if (Array.isArray(leaf.children) && leaf.children.length) {
        return leaf.children.some(searchName);
      }
      return false;
    };

    categoriesTree.some(searchName);
    if (!name) {
      return null;
    }

    return (
      <CategoryItem
        key={`category-${category.value}`}
        categoryValue={category.value}
        selectedCategory={selectedCategory === category.value}
        displayName={`${name} (${category.doc_count})`}
      />
    );
  });

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <Typography component="h2" color="inherit" className={classes.title}>
          {title}
        </Typography>
        <List component="nav" className={ classes.list }>
          { categoryList }
        </List>
      </Grid>
    </Grid>
  );
};

export const CategoriesList = withStyles(styles)(CategoriesListBase);
