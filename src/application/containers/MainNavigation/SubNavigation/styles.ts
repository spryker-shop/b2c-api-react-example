import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        position: 'relative',
        background: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            padding: '40px 20px'
        }
    },
    container: {
        ...theme.appContainerStyles
    },
    grid: {
        display: 'flex',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            margin: '0 -50px'
        },
        [theme.breakpoints.up('xl')]: {
            margin: '0 auto',
            maxWidth: '96%'
        }
    },
    col: {
        padding: '0 50px',
        [theme.breakpoints.up('lg')]: {
            padding: '0 70px'
        }
    },
    colList: {
        [theme.breakpoints.only('md')]: {
            display: 'flex',
            justifyContent: 'center'
        },
        [theme.breakpoints.up('md')]: {
            width: 260,
            borderRight: '1px solid rgba(206, 206, 208, 0.5)'
        },
        [theme.breakpoints.up('lg')]: {
            width: 320
        }
    },
    colPreviews: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: 'calc(100% - 260px)'
        },
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - 320px)'
        }

    },
    listReset: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listChild: {
        padding: '10px 0 0 5px'
    },
    navItem: {
        fontSize: 15,
        paddingBottom: 20,
        '&:last-child': {
            paddingBottom: 0
        }
    },
    navItemLevel1: {
        fontSize: 13,
        paddingBottom: 10
    },
    navItemSimple: {
        whiteSpace: 'nowrap'
    },
    navLink: {
        letterSpacing: 0.2,
        fontWeight: 500,
        color: theme.appColors.grey,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    navStatic: {
        cursor: 'auto',
        '&:hover': {
            color: theme.appColors.grey
        }
    },
    navItemAdditional: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        textDecoration: 'none',
        background: theme.appColors.white,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0 6px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    productImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        lineHeight: 0,
        minHeight: 150,
        maxHeight: 190,
        '&:before': {
            content: '""',
            display: 'block',
            height: 0,
            paddingBottom: '88%'
        }
    },
    productTitle: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: 60,
        padding: '10px 15px',
        [theme.breakpoints.up('xl')]: {
            paddingLeft: 60,
            paddingRight: 60
        }
    },
    hideOntablet: {
        [theme.breakpoints.only('md')]: {
            display: 'none'
        }
    }
});
