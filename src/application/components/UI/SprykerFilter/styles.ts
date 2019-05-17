import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginLeft: 0
    },
    formControl: {
        width: '100%',
        textTransform: 'capitalize'
    },
    icon: {
        fill: 'currentColor',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 18,
        width: 12,
        height: 12,
        lineHeight: 0,
        pointerEvents: 'none'
    },
    iconOpened: {
        color: theme.appColors.blue,
        transform: 'translateY(-50%) rotate(180deg)'
    },
    selectRoot: {
        [theme.breakpoints.only('lg')]: {
            transition: 'color 0.3s ease-in-out',
            color: theme.appColors.black,
            '&:hover': {
                color: theme.appColors.blue
            }
        }
    },
    titleCounter: {
        fontSize: 18
    },
    input: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        padding: '5px 42px 5px 13px',
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:focus:hover, &:hover, &:focus': {
            background: theme.appColors.weekWhite
        },
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.white,
            fontSize: 14,
            height: 42,
            letterSpacing: 0.1,
            '&:focus:hover, &:hover': {
                background: theme.appColors.white,
                color: theme.appColors.grey
            },
            '&:focus': {
                background: theme.appColors.white
            }
        },
        [theme.breakpoints.up('lg')]: {
            '&:focus:hover, &:hover': {
                background: theme.appColors.darkWhite,
                color: theme.appColors.blue
            },
            '&:focus': {
                background: theme.appColors.white
            }
        },
    },
    inputFocused: {
        [theme.breakpoints.up('md')]: {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    modalRoot: {},
    modalRootOpened: {},
    menu: {
        minHeight: 0,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            borderRadius: 4,
            boxShadow: ' 0 4px 10px 0 rgba(216, 216, 216, 0.5)',
            marginTop: -3,
            backgroundColor: theme.appColors.white,
        },
        '&& ul': {
            paddingTop: 5,
            paddingBottom: 9,
            paddingLeft: 10,
            paddingRight: '10px !important',
            [theme.breakpoints.up('md')]: {
                paddingTop: 11
            }
        }
    },
    menuCounter: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            padding: 0,
            marginBottom: 12,
        }
    },
    menuCounterText: {
        fontSize: 12,
        letterSpacing: 0.1,
        color: theme.appColors.grey
    },
    menuItem: {
        display: 'flex',
        fontSize: 14,
        lineHeight: 1.5,
        padding: '11px 14px',
        marginBottom: 8,
        letterSpacing: 0.1,
        height: 'auto',
        borderRadius: 4,
        color: theme.appColors.grey,
        background: theme.appColors.white,
        '&:hover': {
            background: theme.appColors.white
        },
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.weekWhite,
            '&:hover': {
                background: theme.appColors.weekWhite
            },
        },
        [theme.breakpoints.up('lg')]: {
            '&:hover': {
                boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
                background: theme.appColors.white
            },
        },
        '&$selected': {
            color: theme.appColors.white,
            background: theme.appColors.blue,
            '&:hover': {
                background: theme.appColors.blue
            },
            [theme.breakpoints.up('lg')]: {
                '&:hover': {
                    background: theme.appColors.darkBlue
                }
            }
        }
    },
    menuItemName: {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: 6
    },
    resetBtn: {
        padding: 0,
        border: 0,
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: 0.1,
        color: theme.appColors.lightGrey,
        background: 'none',
        pointerEvents: 'auto',
        minWidth: 0,
        '&:hover': {
            color: theme.appColors.blue,
            background: 'none'
        },
        '&$disabled': {
            color: theme.appColors.lightGrey,
            background: 'none'
        }
    },
    disabled: {
        color: theme.appColors.blue,
        background: 'none'
    },
    selected: {
        color: theme.appColors.white,
        background: theme.appColors.blue
    }
});
