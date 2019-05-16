import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    orderList: {},
    amount: {
        display: 'block',
        paddingBottom: 12,
        fontSize: 15
    },
    orderItem: {
        padding: '16px 20px',
        marginBottom: 14,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            paddingRight: 110
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: 20
        }
    },
    col: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.up('lg')]: {
            alignItems: 'flex-start',
            flexDirection: 'column'
        }
    },
    orderText: {
        fontSize: 15,
        lineHeight: 1.7,
        letterSpacing: 0.2,
        color: theme.appColors.grey,
        [theme.breakpoints.up('md')]: {
            fontSize: 14
        },
        [theme.breakpoints.up('lg')]: {
            flexGrow: 0,
            fontSize: 16
        }
    },
    orderTitle: {
        fontWeight: 500,
        color: theme.appColors.black,
        width: 110,
        [theme.breakpoints.up('lg')]: {
            width: 'auto'
        }
    },

    actions: {
        display: 'flex',
        alignItems: 'center',
        margin: -7,
        paddingTop: 10,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 0,
            margin: 0,
            position: 'absolute',
            right: 15,
            top: 11
        },
        [theme.breakpoints.up('lg')]: {
            top: '50%',
            transform: 'translateY(-50%)'
        }
    },
    actionItem: {
        padding: 7,
        flex: '1 1 100%',
        [theme.breakpoints.up('sm')]: {
            flex: '0 1 auto',
            padding: 0
        }
    },
    actionButton: {
        fill: 'currentColor',
        lineHeight: 1,
        fontSize: 14,
        padding: 10,
        height: 50,
        minWidth: 0,
        color: theme.appColors.blue,
        [theme.breakpoints.up('sm')]: {
            color: theme.appColors.lightGrey,
            border: 'none',
            height: 'auto',
            background: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
                background: 'none',
                border: 'none',
                color: theme.appColors.blue
            },
        }
    },
    actionIcon: {
        display: 'block',
        width: 26,
        height: 14
    },
    actionText: {
        paddingLeft: 6,
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    tooltipWrapper: {
        position: 'relative',
        margin: '10px 0 0',
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
        background: theme.appColors.white,
        fontSize: 13,
        fontWeight: 500,
        color: theme.appColors.grey,
        lineHeight: 1.2,
        letterSpacing: 0.1,
        padding: '5px 10px',
        borderRadius: 4
    },
    tooltipArrow: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 4px 0 4px',
        borderColor: `${theme.appColors.white} transparent transparent transparent`
    }
});
