import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginLeft: 0,
        borderRadius: 4,
        backgroundColor: theme.appColors.white
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
        color: theme.appColors.black,
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    input: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: 42,
        padding: '5px 42px 5px 13px',
        fontSize: 14,
        lineHeight: 1.47,
        letterSpacing: 0.1,
        borderRadius: 4,
        background: theme.appColors.white,
        color: theme.appColors.grey,
        '&:focus:hover, &:hover': {
            background: theme.appColors.darkWhite,
            color: theme.appColors.blue
        },
        '&:focus': {
            background: theme.appColors.white
        }
    },
    inputFocused: {
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
    },
    menu: {
        minHeight: '0',
        borderRadius: 4,
        boxShadow: ' 0 4px 10px 0 rgba(216, 216, 216, 0.5)',
        marginTop: -3,
        '&& ul': {
            padding: '11px 10px 2px'
        }
    },
    menuCounter: {
        display: 'flex',
        fontFamily: 'Circular',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
        padding: 0,
        marginBottom: 12
    },
    menuCounterText: {
        fontSize: 12,
        letterSpacing: 0.1,
        color: theme.appColors.grey
    },
    menuItem: {
        display: 'flex',
        fontSize: 14,
        lineHeight: 1.46,
        padding: '12px 14px',
        marginBottom: 8,
        letterSpacing: 0.1,
        height: 'auto',
        borderRadius: 4,
        color: theme.appColors.grey,
        background: theme.appColors.weekWhite,
        '&:hover': {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
            background: theme.appColors.white
        },
        '&$selected': {
            color: theme.appColors.white,
            background: theme.appColors.blue,
            '&:hover': {
                background: theme.appColors.darkBlue
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
