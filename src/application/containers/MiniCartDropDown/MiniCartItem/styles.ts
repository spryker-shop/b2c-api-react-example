import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const cartProductImageSize = 100;

export const styles = (theme: Theme) => createStyles({
    productItem: {
        alignItems: 'stretch',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
    },
    content: {
        height: '100%',
    },
    contentOuter: {
        width: `calc(100% - ${cartProductImageSize}px)`,
        paddingLeft: 15,
    },
    removeBtn: {
        padding: 0,
        borderRadius: 0,
        minHeight: 0,
        textTransform: 'none',
        color: theme.appColors.blue,
        minWidth: 'auto',
        fontSize: theme.appFixedDimensions.fontSize.small,

        '&:hover': {
            color: theme.appColors.black,
            backgroundColor: 'transparent',
        }

    },
    actionArea: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    imageOuter: {},
    name: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        paddingRight: theme.spacing.unit,
    },
    price: {
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
    oldPrice: {
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
    quantity: {
        color: theme.appColors.grey,
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
});
