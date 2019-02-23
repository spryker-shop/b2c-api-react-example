import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { UserDropNavigation } from '@application/containers/UserDropNavigation';
import { MiniCartDropDown } from '@application/containers/MiniCartDropDown';
import { CatalogSearchDrop } from '@application/containers/CatalogSearchDrop';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { IAddNavProps as Props } from './types';
import { styles } from './styles';

export const AdditionalNavigationComponent: React.SFC<Props> = props => {
    const { classes } = props;

    return (
        <div className={ classes.addNavContainer }>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <CatalogSearchDrop />
                </ErrorBoundary>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <UserDropNavigation />
                </ErrorBoundary>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <MiniCartDropDown />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export const AdditionalNavigation = withStyles(styles)(AdditionalNavigationComponent);
