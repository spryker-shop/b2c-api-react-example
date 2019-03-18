import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.appColors.white,
        fontFamily: 'Circular',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
});
