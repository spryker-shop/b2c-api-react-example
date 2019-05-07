import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        padding: '25px 25px 25px',
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        marginBottom: 20,
        position: 'relative',
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2
    },
    title: {
        fontWeight: 700,
        paddingBottom: 14
    }
});
