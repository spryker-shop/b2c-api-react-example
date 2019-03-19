import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover/Popover';
import { IPopoverWrapperProps as Props } from './types';
import { styles } from './styles';

export const PopoverWrapperBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        children,
        popoverPosLeft,
        popoverPosTop,
        anchorElement,
        closePopoverHandler,
        extraContentClassName,
        extraHelperClassName,
    } = props;

    const isOpen = Boolean(anchorElement);

    const popoverStyles = {
        top: popoverPosTop,
        left: 0,
    };

    const popoverProps = {
        open: isOpen,
        anchorEl: anchorElement,
        elevation: 0,
        onClose: closePopoverHandler,
    };

    return (
        <Popover
            {...popoverProps}
            className={classes.popover}
            anchorReference="anchorPosition"
            anchorPosition={{top: 0, left: popoverPosLeft}}
            style={popoverStyles}
            PaperProps={{
                classes: {
                    root: `${classes.content} ${extraContentClassName ? extraContentClassName : ''}`
                }
            }}
        >
            <div className={classes.childWrapper}>
                <div
                    className={
                        `${isOpen ? `${classes.helper} ${extraHelperClassName ? extraHelperClassName : ''}` : ''}`
                    }
                >
                </div>
                {children}
            </div>
        </Popover>
    );
};

export const PopoverWrapper = withStyles(styles)(PopoverWrapperBase);
