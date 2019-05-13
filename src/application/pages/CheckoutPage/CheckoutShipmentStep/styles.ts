import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        padding: '30px 30px 18px 30px',
        borderRadius: 4,
        background: theme.appColors.white,
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        paddingBottom: 20,
        [theme.breakpoints.up('lg')]: {
            fontSize: 30
        }
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            alignItems: 'center',
        }
    },
    button: {
        minWidth: 260,
        marginBottom: 30,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        }
    },
    back: {
        padding: '5px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.grey
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
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
