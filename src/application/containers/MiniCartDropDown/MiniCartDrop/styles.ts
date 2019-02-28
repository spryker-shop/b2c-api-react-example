import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    cartDrop: {
        fontFamily: 'Circular',
        borderRadius: 4,
        boxShadow: '0 6px 10px 0 rgba(216, 216, 216, 0.5)',
        width: 575,
        overflow: 'hidden'
    },
    cartHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 21px 15px',
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey
    },
    cartDropProductsList: {
        listStyle: 'none',
        overflowY: 'auto',
        maxHeight: 110 * 3,
        margin: 0,
        padding: 0
    },
    cartDropProductsItem: {
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        '&:last-child': {
            borderBottom: 0
        }
    },
    cartTotalContainer: {
        borderTop: '1px solid rgba(206, 206, 208, 0.3)',
        padding: '21px 21px 1px 21px',
    },
    cartTotal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    fontTotal: {
        color: theme.appColors.grey
    },
    priceTotal: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.appColors.black
    },
    discountPriceTotal: {
        color: theme.appColors.red
    },
    cartBtns: {
        padding: '18px 21px 12px',
        background: theme.appColors.weekWhite
    }
});
