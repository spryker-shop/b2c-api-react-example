import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 20,

        [theme.breakpoints.down('sm')]: {
            overflow: 'auto',
        }
    },
    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        borderRadius: 4,
        background: theme.appColors.weekWhite,

        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap'
        }
    },
    item: {
        verticalAlign: 'top',

        [theme.breakpoints.down('sm')]: {
            display: 'inline-block',
            background: theme.appColors.weekWhite,
        }
    },
    linkWrapper: {
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',

        '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: 4,
            width: '100%',
            background: theme.appColors.blue,
            transition: 'opacity 0.3s ease-in-out',
            opacity: 0,

            [theme.breakpoints.up('md')]: {
                height: '100%',
                width: 4
            }
        },

        [theme.breakpoints.up('md')]: {
            '&:hover': {
                color: theme.appColors.black
            }
        }
    },
    linkWrapperSelected: {
        background: theme.appColors.white,
        color: theme.appColors.black,
        boxShadow: '0 6px 10px 0 rgba(216, 216, 216, 0.5)',

        '&:after': {
            opacity: 1
        },

        '& $submenu': {
            [theme.breakpoints.up('md')]: {
                display: 'block'
            }
        }
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: 0.2,
        position: 'relative',
        textDecoration: 'none',
        color: 'inherit',

        [theme.breakpoints.up('md')]: {
            minHeight: 60,
            padding: '10px 15px 10px 20px',
            fontSize: 15
        },

        [theme.breakpoints.up('lg')]: {
            paddingLeft: 34,
            fontSize: 18
        }
    },
    linkSubMenu: {
        display: 'block',
        minHeight: 0,
        fontSize: 14,
        padding: '3px 15px 3px 60px',
        color: theme.appColors.grey,
        lineHeight: 1.4,
        transition: 'color 0.3s ease-in-out',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

        [theme.breakpoints.up('lg')]: {
            paddingLeft: 75,
            fontSize: 16,
            '&:hover': {
                color: theme.appColors.black
            }
        }
    },
    linkSelected: {
        color: theme.appColors.blue,
        pointerEvents: 'none'
    },
    icon: {
        fill: theme.appColors.grey,
        width: 22,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    text: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 19
        }
    },
    submenu: {
        display: 'none',
        margin: 0,
        padding: '0 0 5px 0',
        listStyle: 'none'
    },
    submenuItem: {
        paddingBottom: 12
    }
});
