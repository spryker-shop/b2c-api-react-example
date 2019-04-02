import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        background: theme.appColors.white,
        paddingBottom: 40,
        [theme.breakpoints.up('sm')]: {
            background: theme.appColors.weekWhite,
            paddingBottom: 110
        }
    },
    layout: {
        padding: 0,
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            ...theme.appContainerStyles,
            padding: '40px 16px 0'
        }
    },
    box: {
        background: theme.appColors.white,
        borderRadius: 4
    },
    inner: {
        padding: '20px 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '35px 50px 35px'
        }
    },
    heading: {
        display: 'flex',
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    headingItem: {
        width: '50%',
        borderRight: `1px solid ${theme.appColors.weekWhite}`,
        borderBottom: `1px solid ${theme.appColors.weekWhite}`,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        '&:last-child': {
            borderRight: 0
        },
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    headingItemActive: {
        borderBottom: 0,
        color: theme.appColors.black,
        pointerEvents: 'none'
    },
    redirectLink: {
        height: '100%',
        minHeight: 59,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 5px',
        color: 'inherit',
        textDecoration: 'none',
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 0.2,
        [theme.breakpoints.up('sm')]: {
            minHeight: 80,
            fontSize: 18
        }
    },
    formWrapper: {
        paddingBottom: 20
    },
    link: {
        textDecoration: 'none',
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    }
});
