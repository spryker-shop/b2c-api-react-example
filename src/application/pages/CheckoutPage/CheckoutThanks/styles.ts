import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        padding: '26px 15px 30px',
        position: 'relative',
        background: theme.appColors.white,
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '60px 15px'
        }
    },
    inner: {
        width: '100%',
        maxWidth: 490,
        margin: '0 auto',
    },
    title: {
        fontSize: 20,
        paddingBottom: 20,
        [theme.breakpoints.up('lg')]: {
            fontSize: 30,
        }
    },
    information: {
        padding: '30px 18px',
        background: theme.appColors.weekWhite,
        marginBottom: 40,
        [theme.breakpoints.up('md')]: {
            padding: '35px 18px'
        }
    },
    subtitle: {
        display: 'block',
        paddingBottom: 16,
        fontSize: 18,
        lineHeight: 1.6,
        letterSpacing: 0.2,
        color: theme.appColors.black,
        fontWeight: 700,
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    },
    order: {
        display: 'block',
        color: theme.appColors.grey,
        fontWeight: 500,
        textDecoration: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline',
        }
    },
    orderLink: {
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.black
        }
    },
    text: {
        display: 'block',
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        color: theme.appColors.grey
    },
    textEmail: {
        color: theme.appColors.black,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverFlow: 'ellipsis'
    },
    register: {
        paddingBottom: 10,
        textAlign: 'left',
    }
});
