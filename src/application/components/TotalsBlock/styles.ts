import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        paddingBottom: 30
    },
    row: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        alignItems: 'center',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    totalText: {
        fontWeight: 700
    },
    discountText: {
        color: theme.appColors.red
    },
    price: {},
    totalTextPrice: {}
});
