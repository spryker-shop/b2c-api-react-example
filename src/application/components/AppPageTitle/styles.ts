import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        background: theme.appColors.darkWhite,
        padding: '15px 0 5px',
        [theme.breakpoints.up('lg')]: {
            padding: '18px 0 8px',
        }
    },
    container: {
        ...theme.appContainerStyles
    },
    title: {
        paddingBottom: 10
    }
});
