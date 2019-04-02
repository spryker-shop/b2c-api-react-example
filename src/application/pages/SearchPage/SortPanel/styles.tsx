import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 30,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    sortsOuter: {
        justifyContent: 'flex-end'
    },
    relevanceSortMenu: {
        minWidth: 270
    }
});
