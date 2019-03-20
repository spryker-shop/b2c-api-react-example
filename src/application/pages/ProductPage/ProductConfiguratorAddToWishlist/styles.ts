import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    formWishlist: {
        '&:first-child': {
            paddingTop: 0,
        },
        '& > :first-child': {
            paddingTop: 0,
        },
    },
    buyBtnParent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    wishlistBtn: {
        color: theme.appColors.black,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.appColors.deepBlack}`,
        boxShadow: 'none',
        '&:hover': {
            color: theme.appColors.white,
            backgroundColor: theme.appColors.deepBlack,
            border: `1px solid ${theme.appColors.deepBlack}`,
        },
        '&:disabled': {
            cursor: 'not-allowed',
            border: `1px solid ${theme.appColors.weakGrey}`,
        },
    },
});
