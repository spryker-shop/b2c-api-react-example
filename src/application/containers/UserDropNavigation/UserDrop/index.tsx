import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { pathLoginPage, pathRegisterPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Button } from '@material-ui/core';
import { navLinks } from './fixtures';
import { LogoutIcon } from './icons';
import { INavLinkData } from '@interfaces/navigations';
import { IUserDropProps as Props } from './types';
import { styles } from './styles';

export const UserDropComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, isUserLoggedIn, onLogoutClick, onMouseLeave, onMouseEnter } = props;

    const loggedInUser = (
        <ul className={ classes.userDropNav }>
            { navLinks.map((item: INavLinkData) => (
                <li key={ item.title } className={ classes.userItem }>
                    <NavLink to={ item.path } className={ classes.userLink }>
                        <span className={ classes.userIcon }>{ item.icon }</span>
                        <FormattedMessage id={ item.title } />
                    </NavLink>
                </li>
            )) }
            <li className={ classes.userItem }>
                <Button
                    variant="text"
                    onClick={ onLogoutClick }
                    className={ `${classes.userLink} ${classes.userLinkLogout}` }
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
                <Button
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathRegisterPage } /> }
                    variant="outlined"
                    fullWidth
                >
                    <FormattedMessage id={ 'word.register.title' } />
                </Button>
            </li>
            <li className={ classes.userBtnsItem }>
                <Button
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathLoginPage } /> }
                    variant="contained"
                    fullWidth
                >
                    <FormattedMessage id={ 'log.in.button.title' } />
                </Button>
            </li>
        </ul>
    );

    return (
        <div className={ classes.userDrop } onMouseLeave={ onMouseLeave } onMouseEnter={ onMouseEnter }>
            <Typography component="h4" variant="h4" className={ classes.title }>
                <FormattedMessage id={ 'account.title' } />
            </Typography>
            { isUserLoggedIn ? loggedInUser : notLoggedInUser }
        </div>
    );

};

export const UserDrop = withStyles(styles)(UserDropComponent);
