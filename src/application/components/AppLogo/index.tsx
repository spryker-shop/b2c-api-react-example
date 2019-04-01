import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { pathHomePage } from '@constants/routes';
import { ILogoProps as Props } from './types';
import { SprykerLogo, SimpleLogo } from './icons';
import { styles } from './styles';

export const AppLogoComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, addSimpleLogo } = props;

    return (
        <div className={classes.logoContainer}>
            <NavLink to={pathHomePage} className={classes.logo}>
                <span className={ classes.mainLogo }>
                    <SprykerLogo />
                </span>
                { addSimpleLogo &&
                    <span className={ classes.additionalLogo }>
                        <SimpleLogo />
                    </span>
                }
            </NavLink>
        </div>
    );
};

export const AppLogo = withStyles(styles)(AppLogoComponent);
