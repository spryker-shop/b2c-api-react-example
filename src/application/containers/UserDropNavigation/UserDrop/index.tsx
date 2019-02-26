import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { pathLoginPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Button } from '@material-ui/core';
import { customerProfileNavLinks } from '@constants/navLinks';
import { AppBtnLink } from '@application/components/AppBtnLink';
import { LogoutIcon } from './icons';
import { INavLinkData } from '@interfaces/navLinks';
import { IUserDropProps as Props } from './types';
import { styles } from './styles';

export const UserDropComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, isUserLoggedIn, closePopoverHandler, onLogoutClick } = props;

    const loggedInUser = (
        <ul className={ classes.userDropNav }>
            { customerProfileNavLinks.map((item: INavLinkData) => (
                <li key={ item.title } onClick={ closePopoverHandler } className={ classes.userItem }>
                    <NavLink to={ item.path } className={ classes.userLink }>
                        <span className={ classes.userIcon }>{ item.icon }</span>
                        <FormattedMessage id={ item.title } />
                    </NavLink>
                </li>
            )) }
            <li onClick={ closePopoverHandler } className={ classes.userItem }>
                <Button
                    variant="text"
                    onClick={ onLogoutClick }
                    className={`${classes.userLink} ${classes.userLinkLogout}`}
                >
                    <span className={ classes.userIcon }><LogoutIcon /></span>
                    <FormattedMessage id={ 'log.out.button.title' } />
                </Button>
            </li>
        </ul>
    );

    const notLoggedInUser = (
        <ul className={ classes.userBtns }>
            <li className={ classes.userBtnsItem }>
                <AppBtnLink
                    title={ <FormattedMessage id={ 'word.register.title' } /> }
                    path={ pathLoginPage }
                    extraClassName={ classes.userBtnsLink }
                />
            </li>
            <li className={ classes.userBtnsItem }>
                <AppBtnLink
                    title={ <FormattedMessage id={ 'log.in.button.title' } /> }
                    path={ pathLoginPage }
                    type="black"
                    extraClassName={ classes.userBtnsLink }
                />
            </li>
        </ul>
    );

    return (
        <div className={ classes.userDrop }>
            <Typography component="h4" variant="display1" className={ classes.title }>
                <FormattedMessage id={ 'account.title' } />
            </Typography>
            { isUserLoggedIn ? loggedInUser : notLoggedInUser }
        </div>
    );

};

export const UserDrop = withStyles(styles)(UserDropComponent);
