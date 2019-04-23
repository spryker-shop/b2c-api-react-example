import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    orderList: {},
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
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '0 -10px',
        height: '100%'
    },
    viewLink: {
        padding: 10,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    viewIcon: {
        display: 'block',
        fill: 'currentColor',
        width: 26,
        height: 14
    },
    amount: {
        display: 'block',
        paddingBottom: 12
    }
});
