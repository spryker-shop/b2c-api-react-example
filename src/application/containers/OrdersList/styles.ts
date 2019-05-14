import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    orderList: {},
    orderItem: {
        padding: '16px 20px',
        marginBottom: 20,
        borderRadius: 4,
        background: theme.appColors.weekWhite
    },
    orderText: {
        display: 'inline-block',
        width: '50%',
        fonSize: 16,
        lineHeight: 1.7,
        letterSpacing: 0.2,
        color: theme.appColors.grey,

        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: '100%'
        }
    },
    orderTitle: {
        fontWeight: 500,
        color: theme.appColors.black
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',

        [theme.breakpoints.up('md')]: {
            margin: '0 -10px',
            justifyContent: 'flex-end'
        },
    },
    viewLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 30px',
        color: theme.appColors.blue,
        transition: 'color 0.3s ease-in-out',
        lineHeight: 0,
        textDecoration: 'none',
        border: `1px solid ${theme.appColors.lightGrey}`,
        borderRadius: 4,

        [theme.breakpoints.up('md')]: {
            padding: 10,
            color: theme.appColors.lightGrey,
            border: 'none'
        },

        '&:hover': {
            color: theme.appColors.blue
        }
    },
    viewIcon: {
        display: 'block',
        fill: 'currentColor',
        width: 26,
        height: 14
    },
    viewText: {
        display: 'inline-block',
        marginLeft: 6,

        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    amount: {
        display: 'block',
        paddingBottom: 12
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
