import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        borderBottom: `1px solid ${theme.appColors.blockDivider}`,
        borderTop: `1px solid ${theme.appColors.blockDivider}`,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 4,
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    sort: {
        display: 'flex',
    },
    sortsOuter: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
        },
    },
});
