import * as React from 'react';
import { InputAdornment, withStyles, Tooltip } from '@material-ui/core';
import { IInputIconProps as Props } from './types';
import { styles } from './styles';

const InputIconComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        icon,
        position,
        tooltip,
        tooltipPosition = 'bottom-end',
        tooltipComponent,
        tooltipArrowed
    } = props;

    if (!Boolean(icon)) {
        return null;
    }

    const renderIconComponent = (): JSX.Element => (
        <InputAdornment
            position={ position }
            classes={{
                root: `${classes.icon} ${tooltip ? classes.iconHoverable : ''}`,
                positionStart: classes.iconPositionStart,
                positionEnd: classes.iconPositionEnd,
            }}
        >
            { icon }
        </InputAdornment>
    );

    const renderTooltip = (): JSX.Element => (
        <Tooltip
            title={
                <>
                    { tooltipComponent }
                    { tooltipArrowed && <span className={ classes.tooltipArrow } /> }
                </>
            }
            placement={ tooltipPosition }
            enterTouchDelay={ 250 }
            leaveTouchDelay={ 5000 }
            classes={{ tooltip: classes.tooltipWrapper, tooltipPlacementTop: classes.tooltipPlacementTop }}
        >
            { renderIconComponent() }
        </Tooltip>
    );

    return (
        <>
            { tooltip ?  renderTooltip() : renderIconComponent() }
        </>
    );
};

export const InputIcon = withStyles(styles)(InputIconComponent);
