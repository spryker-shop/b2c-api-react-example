import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    divider: {
        border: '6px solid #e0e0e0',
        height: '80%',
        position: 'absolute',
        top: 0,
        left: 'calc(50% - 6px)',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), ' +
        '0px 2px 2px 0px rgba(0, 0, 0, 0.14), ' +
        '0px 3px 1px -2px rgba(0, 0, 0, 0.12)',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    link: {
        margin: theme.spacing.unit * 2,
    },
});
