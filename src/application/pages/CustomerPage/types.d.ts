import { styles } from '@pages/CustomerPage/styles';
import { WithRouter } from '@interfaces/common';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export interface CustomerPageProps extends WithStyles<typeof styles>, WithRouter {}
