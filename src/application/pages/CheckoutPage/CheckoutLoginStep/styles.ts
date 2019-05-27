import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 15px',
        background: theme.appColors.white,
        marginBottom: 20,
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            padding: '40px 30px',
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: 775,
            padding: 50,
            '&:after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                top: 90,
                bottom: 90,
                width: 1,
                background: theme.appColors.weekWhite
            },
        }
    },
    colInner: {
        width: '100%',
        height: '100%',
        borderBottom: `1px solid ${theme.appColors.weekWhite}`,
        paddingBottom: 30,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 40
        }
    },
    grid: {
        width: 'auto',
        margin: -15,
        [theme.breakpoints.up('md')]: {
            margin: -20,
        },
        [theme.breakpoints.up('lg')]: {
            margin: -50,
        }
    },
    col: {
        padding: 15,
        [theme.breakpoints.up('md')]: {
            padding: 20,
        },
        [theme.breakpoints.up('lg')]: {
            padding: 50,
        }
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        [theme.breakpoints.up('lg')]: {
            fontSize: 30
        }
    },
    subheading: {
        marginBottom: 25,
        lineHeight: 1.9,
        fontSize: 15,
        [theme.breakpoints.up('md')]: {
            maxWidth: 450,
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: 50,
            maxWidth: 'none'
        }
    },
    secure: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: theme.appColors.lightGrey
    },
    secureIcon: {
        fill: 'currentColor',
        width: 13,
        height: 17
    },
    secureText: {
        fontSize: 14,
        fontWeight: 500,
        paddingLeft: 9
    }
});
