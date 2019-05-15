import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 40,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 80
        }
    },
    sliderWrapper: {
        paddingTop: 40,
        [theme.breakpoints.up('lg')]: {
            paddingTop: 80
        }
    },
    layout: {
        padding: 15,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        [theme.breakpoints.up('md')]: {
            padding: '32px 20px 20px'
        }
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 6,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 10,
        }
    },
    title: {
        fontWeight: 700,
        fontSize: 18,
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    },
    amount: {
        padding: '5px 14px',
        lineHeight: 1,
        color: theme.appColors.weakGrey,
        background: theme.appColors.white,
        borderRadius: 4,
        fontSize: 15
    },
    subtotal: {
        display: 'none',
        padding: '6px 0 8px',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    },
    subtotalText: {
        paddingRight: 6
    }
});
