import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        alignItems: 'start',
    },
    itemName: {
        fontSize: theme.appFixedDimensions.fontSize.large,
    },
    itemAttr: {
        letterSpacing: '0.2px',
        color: theme.appColors.grey,
        lineHeight: '24px',
    },
    textCapitalize: {
        textTransform: 'capitalize',
    },
    remove: {
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
    mainCurrency: {
        fontSize: theme.appFixedDimensions.fontSize.large,
        letterSpacing: '0.5px',
    },
    sumWrapper: {
        lineHeight: '26px',
        verticalAlign: 'middle',
    },
    eachCurrency: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
    },
    select: {
        width: '52px',
        height: '22px',
        padding: 0,
        paddingLeft: '8px',
    }
});
