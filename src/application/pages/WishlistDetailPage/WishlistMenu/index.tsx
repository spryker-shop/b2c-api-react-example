import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WishListMenuProps } from './types';
import { NavLink } from 'react-router-dom';
import { pathWishlistsPage } from '@constants/routes';
import { MenuList, MenuItem, withStyles } from '@material-ui/core';
import { styles } from './styles';

const WishlistMenuComponent: React.SFC<WishListMenuProps> = ({classes, wishlist}) => (
    <MenuList className={classes.menu}>
        <MenuItem className={classes.menuItem}>
            <NavLink to={pathWishlistsPage} className={classes.link}>
                <FormattedMessage id={ 'word.wishlist.title' } />
            </NavLink>
        </MenuItem>
        {(wishlist && wishlist.name) &&
            <MenuItem className={classes.menuItem}>{wishlist.name}</MenuItem>
        }
    </MenuList>
);

export const WishlistMenu = withStyles(styles)(WishlistMenuComponent);
