import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20
    },
    block: {
        [theme.breakpoints.up('md')]: {
            padding: 20,
            background: theme.appColors.weekWhite,
            borderRadius: 4
        }
    },
});
