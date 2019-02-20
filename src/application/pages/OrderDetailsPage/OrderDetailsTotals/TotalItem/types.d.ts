import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TAbstractTotal } from '@interfaces/abstract/totals';

export interface ITotalItemProps extends WithStyles<typeof styles> {
    value: TAbstractTotal;
    title: string;
    valueSign: string | null;
    extraClassName?: string;
}
