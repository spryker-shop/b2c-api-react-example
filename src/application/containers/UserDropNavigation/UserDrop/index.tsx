import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { pathLoginPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { customerProfileNavLinks } from '@constants/navLinks';
import { AppBtnLink } from '@application/components/AppBtnLink';
import { SprykerButton } from '@application/components/UI/SprykerButton';
import { INavLinkData } from '@interfaces/navLinks';
import { IUserDropProps as Props } from './types';
import { styles } from './styles';

export const UserDropComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes, isUserLoggedIn, closePopoverHandler, onLogoutClick} = props;

    const loggedInUser = (
        <React.Fragment>
            <ul className={classes.userDropNav}>
                {customerProfileNavLinks.map((item: INavLinkData) => (
                    <li key={item.title} onClick={closePopoverHandler}>
                        <NavLink to={item.path}>
                            <FormattedMessage id={item.title} />
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className={classes.userBtns}>
                <SprykerButton
                    title={<FormattedMessage id={'log.out.button.title'} />}
                    onClick={onLogoutClick}
                    extraClasses={classes.actionLogOut}
                />
            </div>
        </React.Fragment>
    );

    const notLoggedInUser = (
        <div className={classes.userBtns}>
            <AppBtnLink
                title={<FormattedMessage id={'word.register.title'} />}
                path={pathLoginPage}
                extraClassName={classes.action} />
            <AppBtnLink
                title={<FormattedMessage id={'log.in.button.title'} />}
                path={pathLoginPage}
                type="black"
                extraClassName={classes.action} />
        </div>
    );

    return (
        <div className={classes.userDrop}>
            <Typography component="h5" className={classes.title}>
                <FormattedMessage id={'account.title'} />
            </Typography>
            {isUserLoggedIn ? loggedInUser : notLoggedInUser}
        </div>
    );

};

export const UserDrop = withStyles(styles)(UserDropComponent);
