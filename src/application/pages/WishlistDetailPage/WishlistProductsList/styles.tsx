import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    block: {
        padding: 20,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    productItem: {
        padding: 15,
        marginBottom: 15,
        flexWrap: 'nowrap',
        background: theme.appColors.white,
        position: 'relative',
        '&:last-child': {
            marginBottom: 0
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: 20,
            padding: '20px 20px 36px 60px',
        }
    },
    imgWrapper: {
        width: 100,
        height: 100,
        minWidth: 100,
        [theme.breakpoints.up('sm')]: {
            width: 132,
            height: 132,
            minWidth: 132
        }
    },
    imageOuter: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
    },
    imageHolder: {
        flexGrow: 1,
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: 10,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 20
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: 10
        }
    },
    colButton: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: 206
        }
    },
    name: {
        maxHeight: 69,
        marginBottom: 10,
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 500,
        color: theme.appColors.grey,
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 3,
        boxOrient: 'vertical',
        [theme.breakpoints.up('md')]: {
            maxHeight: 46,
            lineClamp: 2,
            fontSize: 16
        }
    },
    attributes: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 8,
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: 15
        }
    },
    attributesValue: {
        color: theme.appColors.grey,
        fontWeight: 500,
        paddingLeft: 5,
        flexGrow: 1
    },
    attributesTitle: {
        textTransform: 'capitalize',
        [theme.breakpoints.up('md')]: {
            width: 100
        }
    },
    available: {
        color: theme.appColors.green
    },
    noAvailable: {
        color: theme.appColors.red
    },
    button: {
        fontSize: 14,
        padding: '10px 8px',
        [theme.breakpoints.up('md')]: {
            padding: '13px 15px',
            fontSize: 16
        }
    },
    buttonInner: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonIcon: {
        paddingLeft: 5,
        fill: 'currentColor',
        lineHeight: 0,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 10
        }
    },
    removeButton: {
        padding: '10px 0 10px 25px',
        justifyContent: 'flex-start',
        minWidth: 'auto',
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        cursor: 'pointer',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 30
        },
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            left: 20,
            top: 76,
            padding: 0,
            width: 20,
            height: 20
        },
        '&:hover': {
            color: theme.appColors.red,
            backgroundColor: 'transparent'
        }

    },
    removeButtonIcon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        border: '1px solid currentColor',
        [theme.breakpoints.up('md')]: {
            width: 20,
            height: 20
        },
        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 9,
            height: 1,
            backgroundColor: 'currentColor',
            [theme.breakpoints.up('md')]: {
                width: 12
            }
        },
        '&:after': {
            transform: 'translate(-50%, -50%) rotate(45deg)'
        },
        '&:before': {
            transform: 'translate(-50%, -50%) rotate(-45deg)'
        }
    },
    removeButtonText: {
        fontSize: 13,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
        [theme.breakpoints.up('md')]: {
            fontSize: 15
        },
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    buttonDisabled: {
        opacity: 0.6
    }
});
