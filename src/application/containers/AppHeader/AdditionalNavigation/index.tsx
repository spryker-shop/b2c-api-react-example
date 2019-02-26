import * as React from 'react';
import { appContainerStyles } from '@theme/properties/new/appContainerStyles';
import { appFixedDimensions } from '@theme/properties/new/appFixedDimensions';
import { withStyles, IconButton } from '@material-ui/core';
import { LanguageSwitcher } from '@application/containers/LanguageSwitcher';
import { UserDropNavigation } from '@application/containers/UserDropNavigation';
import { MiniCartDropDown } from '@application/containers/MiniCartDropDown';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import Search from '@material-ui/icons/Search';
import { IAddNavProps as Props } from './types';
import { styles } from './styles';

export const AdditionalNavigationComponent: React.SFC<Props> = props => {
    const {classes, showSearch, handleSearch, isSticky, pageWidth} = props;

    const getPopoverPosition = (
        {
            pageWidth,
            isSticky,
            showSearch,
            overflow,
            popoverWidth
        }: {
            pageWidth: number;
            isSticky: boolean;
            showSearch: boolean;
            overflow: number;
            popoverWidth: number;
        }): {top: number; left: number} => {

        const {headerHeight, customBreakpoints} = appFixedDimensions;
        const containerWidth = Number(appContainerStyles.maxWidth);
        const margin = (pageWidth - containerWidth) / 2;
        const overflowNumber = (pageWidth < customBreakpoints.tablet ? 0 : overflow);
        const fullHeaderHeight = pageWidth < customBreakpoints.smallTablet
            ? headerHeight.tablet
            : headerHeight.desktop;

        const popoverPosLeft: number = margin + containerWidth - popoverWidth + overflowNumber;
        let popoverPosTop: number = headerHeight.sticky;
        if (showSearch) {
            popoverPosTop = fullHeaderHeight;
        } else if (isSticky) {
            popoverPosTop = headerHeight.sticky;
        }

        return {
            top: popoverPosTop,
            left: popoverPosLeft
        };
    };

    const popoverCartPos = getPopoverPosition({
        pageWidth,
        isSticky,
        showSearch,
        overflow: appFixedDimensions.headerPopover.overflow,
        popoverWidth: appFixedDimensions.cartDrop.width
    });

    const popoverUserPos = getPopoverPosition({
        pageWidth,
        isSticky,
        showSearch,
        overflow: appFixedDimensions.headerPopover.overflow,
        popoverWidth: appFixedDimensions.userDrop.width
    });

    return (
        <div className={classes.addNavContainer}>
            <div className={`${classes.addNavItem} ${showSearch ? classes.addNavSearch : ''}`}>
                <IconButton onClick={handleSearch} aria-label="Search">
                    <Search />
                </IconButton>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <LanguageSwitcher />
                </ErrorBoundary>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <UserDropNavigation
                        popoverPosLeft={popoverUserPos.left}
                        popoverPosTop={popoverUserPos.top}
                    />
                </ErrorBoundary>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <MiniCartDropDown
                        popoverPosLeft={popoverCartPos.left}
                        popoverPosTop={popoverCartPos.top}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export const AdditionalNavigation = withStyles(styles)(AdditionalNavigationComponent);
