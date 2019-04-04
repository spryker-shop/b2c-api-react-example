import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        padding: '10px 30px',
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        borderTop: '1px solid rgba(206, 206, 208, 0.3)',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 55,
            paddingRight: 55
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 90,
            paddingRight: 90
        }
    },
    pages: {
        width: 'auto',
        margin: -3,
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            margin: -5
        },
    },
    pageItem: {
        padding: 3,
        [theme.breakpoints.up('sm')]: {
            padding: 5
        },
    },
    // pageAfterEllipsis1: {
    //
    // },
    // pageAfterEllipsis2: {
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'block'
    //     },
    // },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 27,
        height: 27,
        minWidth: 0,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: 0.2,
        lineHeight: 1,
        borderRadius: 4,
        color: theme.appColors.grey,
        border: 0,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        [theme.breakpoints.up('sm')]: {
            width: 35,
            height: 35,
            fontSize: 14,
        },
        [theme.breakpoints.up('md')]: {
            width: 50,
            height: 50,
            fontSize: 16,
        },
        '&:hover, &:active': {
            background: 'none',
            color: theme.appColors.blue
        },
        '&$buttonDisabled': {
            color: theme.appColors.lightGrey,
            background: 'none',
        },
        '&$buttonActive': {
            color: theme.appColors.grey,
            background: theme.appColors.weekWhite,
            '&:hover, &:active': {
                color: theme.appColors.grey,
                background: theme.appColors.weekWhite,
            }
        }
    },
    buttonDot: {
        pointerEvents: 'none'
    },
    buttonDisabled: {},
    buttonActive: {},
    buttonAdditional: {
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
        color: theme.appColors.lightGrey,
        [theme.breakpoints.up('sm')]: {
            color: theme.appColors.grey,
        }
    },
    buttonAdditionalPrevious: {
        right: 'auto',
        left: 0,
    },
    additionalButtonIcon: {
        display: 'block',
        width: 7,
        height: 13,
        stroke: 'currentColor',
        lineHeight: 1
    }
});
