import * as React from 'react';
import { ICategoryItemProps } from './types';
import { ListItem, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

const CategoryItemComponent: React.SFC<ICategoryItemProps> = props => {
    const {
        classes,
        categoryName,
        categoryValue,
        isSelected,
        isActive,
        children,
        selectCategoryHandler,
        quantity
    } = props;

    return (
        <>
            <ListItem
                button
                onClick={ (event: React.MouseEvent<HTMLElement>) => selectCategoryHandler(categoryValue)(event) }
                selected={ isSelected }
                disabled={ !isActive }
                className={ classes.categoryItem }
                disableGutters
                classes={{ selected: classes.selected, disabled: classes.disabled }}
            >
                <div className={ classes.holder }>
                    <Typography component="strong" variant="subheading" color="inherit">
                        { categoryName }
                    </Typography>
                    <span className={`${classes.quantity} ${isSelected ? classes.quantityActive : ''}`}>
                        { quantity }
                    </span>
                </div>
            </ListItem>
            { children && <div className={ classes.children }>{ children }</div> }
        </>
    );
};

export const CategoryItem = withStyles(styles)(CategoryItemComponent);
