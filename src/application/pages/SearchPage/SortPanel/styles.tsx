import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 20,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 30
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    sortsOuter: {
        justifyContent: 'flex-end'
    },
    sortsAmount: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    relevanceSortMenu: {
        minWidth: 200,
        [theme.breakpoints.up('md')]: {
            minWidth: 270,
        }
    },
    selectRoot: {
        color: theme.appColors.grey
    }
});
