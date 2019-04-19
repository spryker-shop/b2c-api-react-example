import * as React from 'react';
import { pathWishlistsPage } from '@constants/routes';
import { HeartIcon } from './icons';
import { withStyles, IconButton } from '@material-ui/core';
import { UserDropNavigation } from '@containers/UserDropNavigation';
import { MiniCartDropDown } from '@containers/MiniCartDropDown';
import { CatalogSearchDrop } from '@containers/CatalogSearchDrop';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { IAddNavProps as Props } from './types';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';

const AdditionalNavigationComponent: React.SFC<Props> = props => {
    const { classes } = props;

    return (
        <div className={ classes.addNavContainer }>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <CatalogSearchDrop
                        classes={{
                            iconButton: classes.iconButton,
                            icon: classes.icon
                        }}
                    />
                </ErrorBoundary>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <UserDropNavigation
                        classes={{
                            iconButton: classes.iconButton,
                            isPopupOpened: classes.isPopupOpened,
                            icon: classes.icon
                        }}
                    />
                </ErrorBoundary>
            </div>
            <div className={ classes.addNavItem }>
                <IconButton
                    aria-label="heart"
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathWishlistsPage } /> }
                    className={ classes.iconButton }
                >
                    <span className={ classes.icon }>
                        <HeartIcon />
                    </span>
                </IconButton>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <MiniCartDropDown
                        classes={{
                            iconButton: classes.iconButton,
                            isPopupOpened: classes.isPopupOpened,
                            icon: classes.icon
                        }}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export const AdditionalNavigation = withStyles(styles)(AdditionalNavigationComponent);
