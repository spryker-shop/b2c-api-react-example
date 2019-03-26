import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface SprykerQuantityCounterProps extends WithStyles<typeof styles> {
    handleChangeQty: (name: string, value: number) => void;
    name: string;
    value?: number;
    step?: number;
    minThreshold?: number;
    rejected: boolean;
}

export interface SprykerQuantityCounterState {
    inputValue: number;
    name: string;
}
