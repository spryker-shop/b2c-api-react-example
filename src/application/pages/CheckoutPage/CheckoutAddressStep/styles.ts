import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        padding: '30px 50px 30px 30px',
        borderRadius: 4,
        background: theme.appColors.white,
        marginBottom: 20
    },
    title: {
        paddingBottom: 20
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    button: {
        minWidth: 260
    },
    back: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.grey
        }
    },
    icon: {
        width: 8,
        height: 14,
        stroke: 'currentColor',
        lineHeight: 0,
        marginRight: 16
    }
});
