import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { INavLinkData } from '@interfaces/navigations';
import { NavLink } from 'react-router-dom';
import { navLinks } from './fixtures';
import { withStyles } from '@material-ui/core';
import { ICustomerSideBarProps as Props } from './types';
import { styles } from './styles';

const CustomerSideBarComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, location } = props;

    const renderNavigationlinks = (): JSX.Element[] => navLinks.map((item: INavLinkData) => {
        const isSelected = location.pathname.includes(item.path);

        return (
            <li className={ classes.item } key={ item.title }>
                <NavLink to={ item.path } className={`${classes.link} ${isSelected ? classes.linkSelected : ''}`}>
                    <span className={ classes.icon }>
                        { item.icon }
                    </span>
                    <span className={ classes.text }><FormattedMessage id={ item.title } /></span>
                </NavLink>
            </li>
        );
    });

    return (
        <div className={ classes.root }>
            <ul className={ classes.list }>{ renderNavigationlinks() }</ul>
        </div>
    );
};

export const CustomerSideBar = withStyles(styles)(CustomerSideBarComponent);
