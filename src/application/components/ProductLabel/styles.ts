import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    labelsOuter: {
        position: 'absolute',
        top: 10,
        left: 5,
        width: 'auto',
        zIndex: 351,
        pointerEvents: 'none',
        padding: '0 5px 10px'
    },
    labelText: {
        display: 'flex',
        minWidth: 56,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 500,
        color: theme.appColors.white,
        padding: '3px 13px',
        letterSpacing: 0.1,
        lineHeight: 1,
        borderRadius: 14
    },
    saleLabel: {
        background: theme.appColors.red
    },
    newLabel: {
        background: theme.appColors.green
    },
    alternativeLabel: {
        background: theme.appColors.orange
    },
    discontinuedLabel: {
        background: theme.appColors.blue
    },
    standardLabel: {
        background: theme.appColors.grey
    }
});
