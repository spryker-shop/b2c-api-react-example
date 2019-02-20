import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    labelsOuter: {
        position: 'absolute',
        top: theme.spacing.unit + theme.spacing.unit / 2,
        left: theme.spacing.unit + theme.spacing.unit / 2,
        width: 'auto',
        zIndex: 351,
    },
    label: {
        marginBottom: 5,
        display: 'flex',
    },
    labelText: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        color: theme.appColors.white,
        padding: 7,
        letterSpacing: 0.6,
        textAlign: 'center',
        lineHeight: 1,
        borderRadius: 2,
        boxShadow: '1px 1px 0 0 rgba(0, 0, 0, 0.08)',
        minWidth: 33,
        display: 'inline-flex',
    },
    saleLabel: {
        background: theme.appColors.blue,
    },
    newLabel: {
        background: theme.appColors.orange,
    },
    alternativeLabel: {
        background: theme.appColors.green,
    },
    discontinuedLabel: {
        background: theme.appColors.red,
    },
    standardLabel: {
        background: theme.appColors.grey,
    },
});
