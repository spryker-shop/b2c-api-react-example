import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { styles } from './styles';
import { SearchPageContext } from '../context';
import { ICategoryItemProps } from '@application/pages/SearchPage/CategoryItem/types';

export const CategoryItemBase: React.SFC<ICategoryItemProps> = props => {
    const {
        classes,
        displayName,
        categoryValue,
        isSelected,
        isActive,
        children,
    } = props;

    return (
        <SearchPageContext.Consumer>
            {({selectCategoryHandler}) => (
                <div className={`${classes.listItemOuter} ${children ? classes.hasChildren : null}`}>
                    <ListItem
                        button
                        onClick={(event: React.MouseEvent<HTMLElement>) => selectCategoryHandler(categoryValue)(event)}
                        selected={isSelected}
                        disabled={!isActive}
                        className={classes.categoryItem}
                        disableGutters
                        classes={{root: classes.root, selected: classes.selected}}
                    >
                        <ListItemText
                            disableTypography
                            classes={{root: classes.categoryItemText}}
                            primary={displayName}
                        />
                    </ListItem>
                    {children
                        ? <div className={classes.children}>{children}</div>
                        : null
                    }
                </div>
            )}
        </SearchPageContext.Consumer>
    );
};

export const CategoryItem = withStyles(styles)(CategoryItemBase);
