import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover/Popover';
import { IPopoverWrapperProps as Props } from './types';
import { styles } from './styles';

export const PopoverWrapperBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        children,
        anchorElement,
        closePopoverHandler,
        anchorOrigin,
        transformOrigin,
        openPopup,
        paperProps
    } = props;

    const isOpen = openPopup !== null ? openPopup : Boolean(anchorElement);

    const popoverProps = {
        open: isOpen,
        anchorEl: anchorElement,
        elevation: 0,
        transformOrigin,
        anchorOrigin,
        onClose: closePopoverHandler
    };

    return (
        <Popover
            { ...popoverProps }
            className={ classes.popover }
            PaperProps={{
                ...paperProps,
                classes: {
                    root: classes.content
                }
            }}
        >
            { children }
        </Popover>
    );
};

PopoverWrapperBase.defaultProps = {
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

export const PopoverWrapper = withStyles(styles)(PopoverWrapperBase);
