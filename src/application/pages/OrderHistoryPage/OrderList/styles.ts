import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    orderItem: {
        padding: '16px 20px',
        marginBottom: 20,
        borderRadius: 4,
        background: theme.appColors.weekWhite
    },
    orderText: {
        display: 'block',
        fonSize: 16,
        lineHeight: 1.7,
        letterSpacing: 0.2,
        color: theme.appColors.grey
    },
    orderTitle: {
        fontWeight: 500,
        color: theme.appColors.black
    }
});
