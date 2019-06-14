import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 30
        }
    },
    title: {
        fontSize: 20
    },
    addButton: {
        minWidth: 110,
        [theme.breakpoints.up('sm')]: {
            minWidth: 160
        }
    },
});
