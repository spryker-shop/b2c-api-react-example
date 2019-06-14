import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover/Popover';
import { IPopoverWrapperProps as Props } from './types';
import { styles } from './styles';

const PopoverWrapperComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        children,
        anchorElement,
        closePopoverHandler,
        anchorOrigin,
        transformOrigin,
        openPopup,
        paperProps,
        hideBackdrop,
        anchorReference,
        anchorPosition
    } = props;

    const isOpen = openPopup !== null ? openPopup : Boolean(anchorElement);
    const isCustomCoordinates = anchorReference === 'anchorPosition';

    const popoverProps = {
        open: isOpen,
        anchorEl: anchorElement,
        elevation: 0,
        transformOrigin,
        anchorOrigin,
        hideBackdrop,
        anchorReference,
        anchorPosition,
        onClose: closePopoverHandler
    };

    return (
        <>
            {isOpen &&
                <Popover
                { ...popoverProps }
                className={`${classes.popover} ${isCustomCoordinates ? classes.customCoordinates : ''}`}
                disablePortal={ true }
                keepMounted={ true }
                PaperProps={{
                    ...paperProps,
                    classes: {
                        root: `${classes.content} ${isCustomCoordinates ? classes.contentCustomCoordinates : ''}`
                    }
                }}
                BackdropProps={{ classes: { root: classes.backdrop } }}
                >
                    { children }
                </Popover>
            }
        </>
    );
};

PopoverWrapperComponent.defaultProps = {
    anchorReference: 'anchorPosition',
    anchorPosition: { top: 0, left: 0 },
    hideBackdrop: true,
    openPopup: null,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
    }
};

export const PopoverWrapper = withStyles(styles)(PopoverWrapperComponent);
