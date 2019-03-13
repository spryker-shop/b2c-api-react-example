import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        ...theme.appContainerStyles,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        paddingTop: theme.spacing.unit * 5,
    },
});
