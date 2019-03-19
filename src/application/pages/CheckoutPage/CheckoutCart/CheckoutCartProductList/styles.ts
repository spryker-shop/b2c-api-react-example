import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    listItem: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        alignItems: 'start',
    },
    itemWrapper: {
        width: '65%',
        paddingLeft: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column',
    },
    itemName: {
        fontSize: theme.appFixedDimensions.fontSize.large,
        letterSpacing: '0.5px',
        marginBottom: '10px',
    },
    priceAndQtyInfo: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        color: theme.appColors.grey,
        letterSpacing: '0.2px',
    },
    smallFont: {
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
    marginTopQty: {
        marginTop: '14px',
    },
});
