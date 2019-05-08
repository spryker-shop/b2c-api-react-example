import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const listWidthMd = 260;
const listWidthLg = 320;

export const styles = (theme: Theme) => createStyles({
    layout: {
        position: 'relative',
        paddingRight: 20,
        [theme.breakpoints.up('md')]: {
            overflow: 'hidden',
            overflowY: 'auto',
            background: theme.appColors.weekWhite,
            padding: '40px 20px'
        }
    },
    container: {
        [theme.breakpoints.up('md')]: {
            ...theme.appContainerStyles
        }
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
        [theme.breakpoints.up('md')]: {
            padding: '0 50px'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 70px'
        }
    },
    colList: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: listWidthMd,
            borderRight: '1px solid rgba(206, 206, 208, 0.5)'
        },
        [theme.breakpoints.only('md')]: {
            display: 'flex',
            justifyContent: 'center'
        },
        [theme.breakpoints.up('lg')]: {
            width: listWidthLg
        }
    },
    colPreviews: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: `calc(100% - ${listWidthMd}px)`
        },
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${listWidthLg}px)`
        }
    },
    listReset: {
        listStyle: 'none',
        padding: '0 0 0 16px',
        margin: 0,
        [theme.breakpoints.up('md')]: {
            padding: 0
        }
    },
    listChild: {
        paddingTop: 10,
        marginBottom: -10,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0,
            paddingBottom: 5
        }
    },
    navItem: {
        fontSize: 14,
        paddingBottom: 10,
        [theme.breakpoints.up('md')]: {
            fontSize: 15,
            paddingBottom: 20,
            '&:last-child': {
                paddingBottom: 0
            }
        }
    },
    navItemLevel1: {
        fontSize: 14,
        [theme.breakpoints.up('md')]: {
            fontSize: 13,
            paddingBottom: 10
        }
    },
    navItemSimple: {
        [theme.breakpoints.up('md')]: {
            whiteSpace: 'nowrap'
        }
    },
    navLink: {
        display: 'block',
        padding: '11px 15px',
        textDecoration: 'none',
        color: theme.appColors.grey,
        letterSpacing: 0.1,
        borderRadius: 4,
        background: 'rgba(206, 206, 208, 0.16)',
        [theme.breakpoints.up('md')]: {
            background: 'none',
            display: 'inline',
            borderRadius: 0,
            letterSpacing: 0.2,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
                color: theme.appColors.blue
            }
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
        [theme.breakpoints.only('md')]: {
            display: 'block'
        }
    },
    navItemAdditionalTouched: {
        display: 'block'
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
            paddingLeft: 25,
            paddingRight: 25
        }
    },
    hideOntablet: {
        [theme.breakpoints.only('md')]: {
            display: 'none'
        }
    }
});
