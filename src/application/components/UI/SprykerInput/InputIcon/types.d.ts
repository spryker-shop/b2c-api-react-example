import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IInputIconProps extends WithStyles<typeof styles> {
    icon: React.ReactNode | null;
    position?: 'end' | 'start';
    tooltip?: boolean;
    tooltipPosition?:
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
    tooltipComponent?: React.ReactNode;
    tooltipArrowed?: boolean;
}