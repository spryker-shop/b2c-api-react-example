import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 16
        }
    },
    list: {
        display: 'none',
        padding: '0 14px 10px',
        background: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            display: 'block',
            background: 'none',
            padding: 0
        },
        [theme.breakpoints.only('md')]: {
            background: theme.appColors.white,
            padding: '10px 14px',
            width: 343,
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
            borderRadius: 4
        }
    },
    listOpened: {
        display: 'block'
    },
    title: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        padding: '5px 42px 5px 13px',
        fontSize: 16,
        lineHeight: 1.47,
        letterSpacing: 0.2,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.white,
            fontSize: 14,
            height: 42,
            letterSpacing: 0.1
        },
        [theme.breakpoints.up('lg')]: {
            display: 'block',
            background: 'none',
            fontSize: 18,
            fontWeight: 700,
            padding: '0 0 20px'
        }
    },
    chevron: {
        fill: theme.appColors.black,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 18,
        width: 12,
        height: 12,
        lineHeight: 0,
        pointerEvents: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    chevronOpened: {
        fill: theme.appColors.blue,
        transform: 'translateY(-50%) rotate(180deg)'
    },
    popoverContent: {
        marginTop: -3
    }
});
