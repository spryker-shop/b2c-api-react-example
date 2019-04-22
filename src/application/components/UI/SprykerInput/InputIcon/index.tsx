import * as React from 'react';
import { InputAdornment, withStyles, Tooltip } from '@material-ui/core';
import { IInputIconProps as Props } from './types';
import { styles } from './styles';

export const InputIconComponent: React.SFC<Props> = (props): JSX.Element => {
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
            classes={{ tooltip: classes.tooltipWrapper }}
        >
            { renderIconComponent() }
        </Tooltip>
    );

    return (
        <>
            { tooltip ?  renderTooltip() : renderIconComponent()}
        </>
    );
};

export const InputIcon = withStyles(styles)(InputIconComponent);
