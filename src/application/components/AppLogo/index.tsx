import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles, Hidden } from '@material-ui/core';
import { pathHomePage } from '@constants/routes';
import { ILogoProps as Props } from './types';
import { SprykerLogo, SprykerLogoWithoutImage } from './icons';
import { styles } from './styles';

export const AppLogoComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, addlLogoWithoutImage } = props;

    return (
        <div className={ classes.logoContainer }>
            <NavLink to={ pathHomePage } className={ classes.logo }>
                <Hidden only="xs">
                    <span className={ classes.mainLogo }>
                        <SprykerLogo />
                    </span>
                </Hidden>
                { addlLogoWithoutImage &&
                    <Hidden smUp>
                        <span className={ classes.additionalLogo }>
                            <SprykerLogoWithoutImage />
                        </span>
                    </Hidden>
                }
            </NavLink>
        </div>
    );
};

export const AppLogo = withStyles(styles)(AppLogoComponent);
