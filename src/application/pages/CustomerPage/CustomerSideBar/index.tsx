import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { INavLinkData } from '@interfaces/navigations';
import { NavLink } from 'react-router-dom';
import { navLinks } from './fixtures';
import { withStyles } from '@material-ui/core';
import { ICustomerSideBarProps as Props } from './types';
import { pathWishlistsPage } from '@constants/routes';
import { styles } from './styles';

const CustomerSideBarComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, location, wishlists } = props;

    const renderWishlistMenu = (): JSX.Element[] => wishlists.map(wishlist => {
        const wishlistLink = `${pathWishlistsPage}/${wishlist.id}`;
        const isSelected = location.pathname === wishlistLink;

        return (
            <li className={ classes.submenuItem } key={ wishlist.id }>
                <NavLink
                    to={ wishlistLink }
                    className={`${classes.link} ${classes.linkSubMenu} ${isSelected ? classes.linkSelected : ''}`}
                >
                    {wishlist.name}
                </NavLink>
            </li>
        );
    });

    const renderNavigationlinks = (): JSX.Element[] => navLinks.map((item: INavLinkData) => {
        const isSelected = location.pathname.includes(item.path);

        return (
            <li className={ classes.item } key={ item.title }>
                <div className={`${classes.linkWrapper} ${isSelected ? classes.linkWrapperSelected : ''}`}>
                    <NavLink to={ item.path } className={ classes.link }>
                        <span className={ classes.icon }>
                            { item.icon }
                        </span>
                        <span className={ classes.text }><FormattedMessage id={ item.title } /></span>
                    </NavLink>
                    { (item.isWishlist && Boolean(wishlists)) &&
                        <ul className={ classes.submenu }>
                            { renderWishlistMenu() }
                        </ul>
                    }
                </div>
            </li>
        );
    });

    return (
        <div className={ classes.root }>
            <ul className={ classes.list }>{ renderNavigationlinks() }</ul>
        </div>
    );
};

export const CustomerSideBar = connect(withStyles(styles)(CustomerSideBarComponent));
