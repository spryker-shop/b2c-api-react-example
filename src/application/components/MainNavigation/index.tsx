import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { IMainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { fixtures } from './fixtures';
import { FormattedMessage } from 'react-intl';

export const MainNavigationComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes, mobileNavState} = props;

    return (
        <nav className={`${classes.mainNav} ${mobileNavState ? classes.mainNavOpened : ''}`}>
            {fixtures.map(category => (
                <span className={classes.mainNavItem} >
                    <NavLink key={category.name + category.path} className={classes.mainNavLink} to={category.path}>
                        <FormattedMessage id={category.name} />
                    </NavLink>
                </span>
            ))}
        </nav>
    );
}

export const MainNavigation = connect(withStyles(styles)(MainNavigationComponent));
