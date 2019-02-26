import * as React from 'react';
import { ICategoryItemProps } from './types';
import { ListItem, ListItemText, withStyles } from '@material-ui/core';
import { styles } from './styles';

export const CategoryItemBase: React.SFC<ICategoryItemProps> = props => {
    const {
        classes,
        displayName,
        categoryValue,
        isSelected,
        isActive,
        children,
        selectCategoryHandler
    } = props;

    return (
        <div className={ `${classes.listItemOuter} ${children ? classes.hasChildren : null}` }>
            <ListItem
                button
                onClick={ (event: React.MouseEvent<HTMLElement>) => selectCategoryHandler(categoryValue)(event) }
                selected={ isSelected }
                disabled={ !isActive }
                className={ classes.categoryItem }
                disableGutters
                classes={ { root: classes.root, selected: classes.selected } }
            >
                <ListItemText
                    disableTypography
                    classes={ { root: classes.categoryItemText } }
                    primary={ displayName }
                />
            </ListItem>
            { children && <div className={ classes.children }>{ children }</div> }
        </div>
    );
};

export const CategoryItem = withStyles(styles)(CategoryItemBase);
