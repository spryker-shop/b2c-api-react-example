import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        width: '100%',
        left: 0,
        top: 0,
        padding: 0
    },
    container: {
        minHeight: 70,
        margin: 0
    },
    body: {
        ...theme.appContainerStyles,
        display: 'flex',
        alignItems: 'center',
        fontSize: 16,
        letterSpacing: 0.6,
        fontWeight: 700
    }
});
