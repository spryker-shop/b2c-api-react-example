import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        position: 'absolute',
        left: 0,
        top: '100%',
        width: '100vw',
        '&:before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '100vh',
            transform: 'translateX(-50%)',
            width: 9999,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: -1,
            pointerEvents: 'none'
        }
    },
    inner: {
        position: 'relative',
        background: theme.appColors.weekWhite,
        padding: '40px 20px'
    },
    layoutSimple: {
        minWidth: '100%',
        width: 'auto'
    },
    container: {
        ...theme.appContainerStyles
    },
    grid: {
        display: 'flex',
        maxWidth: '96%',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'none'
        }
    },
    col: {
        padding: '0 70px',
        [theme.breakpoints.down('md')]: {
            padding: '0 30px'
        }
    },
    colList: {
        width: 320,
        borderRight: '1px solid rgba(206, 206, 208, 0.5)'
    },
    colPreviews: {
        width: 'calc(100% - 320px)'
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
        paddingBottom: 10,
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
        padding: '10px 30px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: 15,
            paddingRight: 15
        }
    }
});
