import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        lineHeight: 'normal',
        letterSpacing: 0.5,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
    },
    panelRoot: {
        padding: 0,
        borderBottomLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderBottomRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        boxShadow: 'none',
        border: `solid 1px ${theme.appColors.weakGrey}`,
        backgroundColor: theme.appColors.white,
    },
    panelExpanded: {
        margin: '0 0',
    },
    panelSummaryRoot: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        minHeight: 'auto !important',
    },
    panelSummaryExpanded: {
        margin: '0 0 0 !important',
    },
    panelSummaryContent: {
        margin: '0 0',
    },
    panelDetailRoot: {
        paddingLeft: theme.spacing.unit * 1.5,
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 1.5,
    },
    icon: {
        color: theme.appColors.black,
        right: 10,
        padding: 0,
        margin: '0 !important',
    },
    rangeOuter: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3,
        paddingRight: 0,
        maxWidth: `calc(100% - ${theme.spacing.unit * 3}px)`,
        margin: 'auto',
    },
    range: {
        color: theme.appColors.black,
    },
    valueMin: {
        textAlign: 'left',
    },
    valueMax: {
        textAlign: 'right',
    },
    value: {
        fontSize: `${theme.appFixedDimensions.fontSize.medium} !important`,
        fontWeight: 600,
    },
});
