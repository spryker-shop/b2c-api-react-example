import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 4,
        height: '100%',
        padding: '4px 24px'
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 16
    },
    itemName: {
        fontSize: 13,
        letterSpacing: 0.1,
        lineHeight: 1.7,
        fontWeight: 500,
        color: theme.appColors.grey,
        marginBottom: 5,
        whiteSpace: 'normal'
    },
    prices: {
        display: 'flex',
        alignItems: 'flex-end',
        margin: '0 -5px'
    },
    priceItem: {
        padding: '0 5px',
        lineHeight: 1,
        fontSize: 14,
        letterSpacing: 0,
    },
    mainPrice: {
        color: theme.appColors.black,
    },
    newPrice: {
       color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 13,
        letterSpacing: 0.2,
        fontWeight: 400,
        color: theme.appColors.grey
    },
    textWithoutDecoration: {
        textDecoration: 'none'
    },
    imageWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        minWidth: 50,
        background: theme.appColors.white
    },
    imageOverlay: {
        background: 'none'
    },
    image: {
        width: 45,
        minWidth: 45,
        height: 45
    }
});
