import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { pathHomePage } from '@constants/routes';
import { ILogoProps as Props } from './types';
import { DefaultLogo } from './icons';
import { styles } from './styles';

export const AppLogoComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes, copyRights, customLogo} = props;

    return (
        <div className={classes.logoContainer}>
            <NavLink to={pathHomePage} className={classes.logo}>
                { customLogo
                    ? customLogo
                    : <DefaultLogo />
                }
            </NavLink>
            {copyRights &&
                <span className={classes.logoCopy}>
                    {copyRights}
                </span>
            }
        </div>
    );
};

export const AppLogo = withStyles(styles)(AppLogoComponent);
