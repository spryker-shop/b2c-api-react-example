import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISprykerButtonProps extends WithStyles<typeof styles> {
    title: string;
    extraClasses?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    iconComponent?: JSX.Element;
    value?: string | number;
    btnType?: 'button' | 'reset' | 'submit';
}
