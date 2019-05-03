import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        flexGrow: 1,
        overflowX: 'hidden'
    },
    layout: {
        paddingTop: 20,
        ...theme.appContainerStyles,
        [theme.breakpoints.up('lg')]: {
            paddingTop: 40
        }
    }
});
