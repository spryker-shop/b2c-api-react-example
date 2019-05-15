import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        paddingBottom: 20,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 0
        }
    },
    block: {
        padding: '20px 15px',
        background: theme.appColors.white,
        marginBottom: 20,
        [theme.breakpoints.up('md')]: {
            padding: 20,
            marginBottom: 12
        },
        [theme.breakpoints.up('lg')]: {
            padding: 30,
            marginBottom: 20
        }
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 10,
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    title: {
        fontSize: 20,
        [theme.breakpoints.up('lg')]: {
            fontSize: 30
        }
    },
    link: {
        width: 40,
        height: 40,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: theme.appColors.weekWhite,
        transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
        color: theme.appColors.weakGrey,
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.blue,
            background: 'rgba(8, 148, 161, 0.1)'
        }
    },
    linkIcon: {
        width: 16,
        height: 16,
        fill: 'currentColor',
        lineHeight: 0
    },
    submitButton: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '10px 15px',
        zIndex: 351,
        background: theme.appColors.white,
        [theme.breakpoints.up('md')]: {
            position: 'static',
            padding: 0,
            background: 'none'
        }
    }
});
