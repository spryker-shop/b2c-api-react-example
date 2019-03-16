import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        background: theme.appColors.white,
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 5
    },
    wrapperBg: {
        background: theme.appColors.weekWhite
    },
    layout: {
        ...theme.appContainerStyles
    }
});
