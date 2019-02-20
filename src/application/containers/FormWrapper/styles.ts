import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 8,
        '&:first-child': {
            marginTop: theme.spacing.unit * 2.25,
        },
        '&:last-child': {
            marginBottom: theme.spacing.unit * 8,
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing.unit * 3,
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing.unit * 3,
        },
    },
    panelRoot: {
        padding: 0,
        borderBottomLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderBottomRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        boxShadow: 'none',
        backgroundColor: theme.appColors.white,
    },
    panelExpanded: {
        margin: '0 0',
    },
    icon: {
        color: theme.appColors.black,
        right: 10,
        padding: 0,
        margin: '0 !important',
    },
    panelSummaryRoot: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        minHeight: 'auto !important',
    },
    panelSummaryContent: {
        margin: '0 0',
    },
    panelSummaryExpanded: {
        margin: `0 0 0 !important`,
    },
    panelDetailRoot: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
    },
    formOuter: {
        width: `100%`,
        margin: 'auto',
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.xl,
        fontWeight: 'normal',
        lineHeight: 1.13,
        letterSpacing: -0.8,
        paddingLeft: 0,
        paddingBottom: theme.spacing.unit * 2,
        color: theme.appColors.black,
        borderBottom: `solid 1px ${theme.appColors.weakGrey}`,
        width: '100%',
    },
});
