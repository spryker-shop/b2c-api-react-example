import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        ...theme.appContainerStyles,
        minHeight: 'calc(100vh - 163px - 366px)',
    },
    container: {
        position: 'relative',
        paddingTop: theme.spacing.unit * 5,
    },
});
