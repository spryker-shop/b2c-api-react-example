import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        background: theme.appColors.weekWhite,
        paddingBottom: 50
    },
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        margin: -5,
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        },
        [theme.breakpoints.up('lg')]: {
            margin: -10
        }
    },
    contentColumn: {
        flexGrow: 1,
        padding: 5,
        [theme.breakpoints.up('lg')]: {
            padding: 10
        }
    },
    summaryColumn: {
        display: 'none',
        padding: 5,
        flexShrink: 0,
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: '40%'
        },
        [theme.breakpoints.up('lg')]: {
            padding: 10,
            width: '38%'
        }
    },
    summaryColumnSummary: {
        display: 'block'
    },
    fullWidth: {
        width: '100%'
    }
});
