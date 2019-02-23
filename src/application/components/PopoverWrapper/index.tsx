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
        extraContentClassName,
        anchorOrigin,
        transformOrigin
    } = props;

    const isOpen = Boolean(anchorElement);

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
                classes: {
                    root: `${classes.content} ${extraContentClassName ? extraContentClassName : ''}`
                }
            }}
        >
            <div className={ classes.childWrapper }>
                { children }
            </div>
        </Popover>
    );
};

PopoverWrapperBase.defaultProps = {
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
