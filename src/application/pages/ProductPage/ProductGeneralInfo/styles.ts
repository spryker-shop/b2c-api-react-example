import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
       paddingBottom: 30
    },
    availableContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        height: 26,
        marginBottom: 20,
        padding: '5px 14px',
        borderRadius: 14,
        background: theme.appColors.weekWhite,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        textTransform: 'uppercase'
    },
    available: {
        color: theme.appColors.green
    },
    unavailable: {
        color: theme.appColors.lightGrey
    },
    title: {
        paddingBottom: 16,
        fontWeight: 700
    },
    productInfo: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    priceBlock: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    price: {
        color: theme.appColors.black,
        fontSize: 24,
        fontWeight: 500,
        lineHeight: 1,
        paddingRight: 10
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        paddingRight: 8,
        color: theme.appColors.grey,
        fontSize: 18,
        letterSpacing: 0.3,
        lineHeight: 1,
    },
    vat: {
        color: theme.appColors.lightGrey,
        fontSize: 14,
        lineHeight: 1,
        letterSpacing: 0
    }
});
