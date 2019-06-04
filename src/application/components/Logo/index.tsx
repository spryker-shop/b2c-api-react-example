import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles, Hidden } from '@material-ui/core';
import { pathHomePage } from '@constants/routes';
import { ILogoProps as Props } from './types';
import { SprykerLogo, SprykerLogoWithoutImage, SimpleLogo } from './icons';
import { styles } from './styles';

const LogoComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, addlLogoWithoutImage, addSimpleLogo } = props;

    return (
        <div className={ classes.logoContainer }>
            <NavLink to={ pathHomePage } className={ classes.logo }>
                <Hidden only="xs">
                    <span className={ classes.mainLogo }>
                        <SprykerLogo />
                    </span>
                </Hidden>
                <Hidden smUp>
                    { addlLogoWithoutImage &&
                        <span className={ classes.additionalLogo }>
                            <SprykerLogoWithoutImage />
                        </span>
                    }

                    { addSimpleLogo &&
                        <span className={ classes.additionalLogo }>
                            <SimpleLogo />
                        </span>
                    }
                </Hidden>
            </NavLink>
        </div>
    );
};

export const Logo = withStyles(styles)(LogoComponent);
