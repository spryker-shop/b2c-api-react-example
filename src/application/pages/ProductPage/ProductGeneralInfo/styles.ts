import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
       paddingBottom: 14
    },
    availableContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        height: 26,
        marginBottom: 12,
        padding: '5px 14px',
        borderRadius: 14,
        background: theme.appColors.weekWhite,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 0.1,
        textTransform: 'uppercase',
        [theme.breakpoints.up('lg')]: {
            marginBottom: 20,
            fontSize: 12,
        }
    },
    available: {
        color: theme.appColors.green
    },
    unavailable: {
        color: theme.appColors.lightGrey
    },
    title: {
        paddingBottom: 16,
        fontWeight: 700,
        fontSize: 16,
        [theme.breakpoints.up('lg')]: {
            fontSize: 20,
        }
    },
    priceBlock: {
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        paddingBottom: 16,
    },
    price: {
        color: theme.appColors.black,
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 1.2,
        paddingRight: 6,
        [theme.breakpoints.up('lg')]: {
            fontSize: 24,
            paddingRight: 10,
        }
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        paddingRight: 8,
        color: theme.appColors.grey,
        fontSize: 16,
        letterSpacing: 0.3,
        lineHeight: 1.2,
        [theme.breakpoints.up('lg')]: {
            fontSize: 18,
        }
    },
    vat: {
        color: theme.appColors.lightGrey,
        fontSize: 12,
        lineHeight: 1.2,
        letterSpacing: 0,
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        }
    }
});
