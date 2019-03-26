import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { pathHomePage } from '@constants/routes';
import { ILogoProps as Props } from './types';
import { SprykerLogo } from './icons';
import { styles } from './styles';

export const AppLogoComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes} = props;

    return (
        <div className={classes.logoContainer}>
            <NavLink to={pathHomePage} className={classes.logo}>
                <SprykerLogo />
            </NavLink>
        </div>
    );
};

export const AppLogo = withStyles(styles)(AppLogoComponent);
