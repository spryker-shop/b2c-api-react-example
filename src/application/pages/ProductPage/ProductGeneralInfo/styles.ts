import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        borderBottom: `1px solid ${theme.appColors.blockDivider}`,
        paddingBottom: theme.spacing.unit * 3,
        paddingLeft: 0,
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.xl,
        lineHeight: 1.13,
        letterSpacing: -0.8,
        marginBottom: theme.spacing.unit,
    },
    productInfo: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    priceBlock: {
        display: 'flex',
        alignItems: 'flex-end',
        flexGrow: 1,
        '& > *': {
            marginRight: `${theme.spacing.unit}px !important`,
            display: 'block',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: theme.spacing.unit * 3,
        },
    },
    price: {
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.huge,
        marginBottom: 0,
        lineHeight: 0.8,
    },
    oldPrice: {
        color: theme.appColors.grey,
        fontSize: theme.appFixedDimensions.fontSize.small,
        margin: 0,
        lineHeight: 1,
    },
    vat: {
        color: theme.appColors.grey,
        fontSize: theme.appFixedDimensions.fontSize.small,
        margin: 0,
        lineHeight: 1,
    }
});
