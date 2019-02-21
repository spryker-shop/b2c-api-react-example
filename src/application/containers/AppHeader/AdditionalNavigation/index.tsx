import * as React from 'react';
import { appContainerStyles } from '@theme/properties/new/appContainerStyles';
import { appFixedDimensions } from '@theme/properties/new/appFixedDimensions';
import { withStyles, IconButton } from '@material-ui/core';
import { SearchIcon } from './icons';
import { UserDropNavigation } from '@application/containers/UserDropNavigation';
import { MiniCartDropDown } from '@application/containers/MiniCartDropDown';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { IAddNavProps as Props } from './types';
import { styles } from './styles';

export const AdditionalNavigationComponent: React.SFC<Props> = props => {
    const { classes, showSearch, handleSearch, isSticky, pageWidth, headerHeight } = props;

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
        }): { top: number; left: number } => {

        const { customBreakpoints } = appFixedDimensions;
        const containerWidth = Number(appContainerStyles.maxWidth);
        const margin = (pageWidth - containerWidth) / 2;
        const overflowNumber = (pageWidth < customBreakpoints.tablet ? 0 : overflow);

        const popoverPosLeft: number = margin + containerWidth - popoverWidth + overflowNumber;
        console.log(margin, containerWidth, popoverWidth, overflowNumber);
        return {
            top: Number(headerHeight),
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
        <div className={ classes.addNavContainer }>
            <div className={ classes.addNavItem }>
                <IconButton onClick={ handleSearch } aria-label="Search" className={ classes.temporary }>
                    <SearchIcon />
                </IconButton>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <UserDropNavigation
                        popoverPosLeft={ popoverUserPos.left }
                        popoverPosTop={ popoverUserPos.top }
                    />
                </ErrorBoundary>
            </div>
            <div className={ classes.addNavItem }>
                <ErrorBoundary>
                    <MiniCartDropDown
                        popoverPosLeft={ popoverCartPos.left }
                        popoverPosTop={ popoverCartPos.top }
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export const AdditionalNavigation = withStyles(styles)(AdditionalNavigationComponent);
