import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/AppMain/styles';

export interface IAppMainProps extends WithStyles<typeof styles> {
    isDifferentBg: boolean;
}
