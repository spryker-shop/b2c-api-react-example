import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        paddingBottom: 15,
        marginBottom: 15,
        flexWrap: 'nowrap',
        borderBottom: `1px solid ${theme.appColors.weekWhite}`,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20,
            marginBottom: 20,
        },
        '&:last-child': {
            paddingBottom: 0,
            marginBottom: 0,
            border: 'none'
        }
    },
    productItemHidden: {
        display: 'none'
    },
    imageOuter: {
        flexShrink: 0
    },
    imageWrapper: {
        width: 56,
        minWidth: 56,
        height: 56,
        [theme.breakpoints.up('lg')]: {
            width: 80,
            minWidth: 80,
            height: 80
        }
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: 10
    },
    info: {
        display: 'flex',
        flexDirection: 'column'
    },
    infoContent: {
        paddingBottom: 10,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 0
        }
    },
    growedBlock: {
        flexGrow: 1
    },
    name: {
        maxHeight: 42,
        marginBottom: 5,
        overflow: 'hidden',
        color: theme.appColors.grey,
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 2,
        boxOrient: 'vertical',
        [theme.breakpoints.up('lg')]: {
            marginBottom: 10
        }
    },
    attributes: {
        dispay: 'block',
        fontSize: 12,
        letterSpacing: 0.1,
        lineHeight: 1.7,
        textTransform: 'capitalize',
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 4,
            fontSize: 13
        }
    },
    attributesValue: {
        color: theme.appColors.grey
    },
    prices: {
        display: 'flex',
        alignItems: 'flex-end',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    },
    price: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.4,
        [theme.breakpoints.up('lg')]: {
            fontSize: 18,
            textAlign: 'right'
        }
    },
    newPrice: {
        color: theme.appColors.red,
        paddingRight: 8,
        [theme.breakpoints.up('lg')]: {
            paddingRight: 0
        }
    },
    oldPrice: {
        fontSize: 13,
        letterSpacing: 0.3,
        fontWeight: 400,
        [theme.breakpoints.up('lg')]: {
            fontSize: 15
        }
    }
});
