import * as React from 'react';
import { ICategoryItemProps } from './types';
import { ListItem, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { ClickEvent } from '@interfaces/common';

const CategoryItemComponent: React.FC<ICategoryItemProps> = (props): JSX.Element => {
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
                onClick={ (event: ClickEvent) => selectCategoryHandler(categoryValue)(event) }
                selected={ isSelected }
                disabled={ !isActive }
                className={ classes.categoryItem }
                disableGutters
                classes={{ selected: classes.selected, disabled: classes.disabled }}
            >
                <div className={ classes.holder }>
                    <Typography component="strong" variant="h6" color="inherit">
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
