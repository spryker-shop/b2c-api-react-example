import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { SideBarProps } from './types';
import { ClickEvent } from '@interfaces/common';
import { INavLinkData } from '@interfaces/navLinks';
import { NavLink } from 'react-router-dom';
import { customerProfileNavLinks } from '@constants/navLinks';
import {
    withStyles,
    Paper,
    MenuList,
    MenuItem,
    Divider
} from '@material-ui/core';
import { styles } from './styles';

@connect
export class SideBarComponent extends React.Component<SideBarProps> {
    protected handleLogout = (event: ClickEvent) => {
        event.preventDefault();
        this.props.logout();
    };

    public render = () => {
        const { classes, location } = this.props;

        return (
            <Paper className={ classes.rootPaper }>
                <MenuList>
                    { customerProfileNavLinks.map((item: INavLinkData) => {
                        const isSelected = (location.pathname === item.path)
                            || location.pathname.includes(item.path);

                        return (
                            <MenuItem
                                key={ item.title }
                                selected={ isSelected }
                            >
                                <NavLink to={ item.path }
                                         className={ classes.link }>
                                    <FormattedMessage id={ item.title } />
                                </NavLink>
                            </MenuItem>
                        );
                    }) }
                </MenuList>
                <Divider />

                <div
                    className={ `${classes.link} ${classes.logoutLink}` }
                    onClick={ this.handleLogout }
                >
                    <FormattedMessage id={ 'log.out.button.title' } />
                </div>
            </Paper>
        );
    }
}

export const SideBar = withStyles(styles)(SideBarComponent);
