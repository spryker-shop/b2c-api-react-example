import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 0,
        marginTop: theme.spacing.unit * 3,
        height: '100%',
        paddingTop: 0,
        paddingBottom: 0,
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 2,
        alignSelf: 'stretch',
    },
    itemName: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '0.5px',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    mainPrice: {
        fontSize: theme.appFixedDimensions.fontSize.large,
        letterSpacing: '1px',
        color: theme.appColors.black,
    },
    oldPrice: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: '1px',
        color: theme.appColors.grey,
    },
    mediumText: {
        fontWeight: 500
    },
    lightText: {
        fontWeight: 300
    },
    textWithoutDecoration: {
        textDecoration: 'none'
    }
});
