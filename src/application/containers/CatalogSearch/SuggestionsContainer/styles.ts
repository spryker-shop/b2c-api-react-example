import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    completion: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '22px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        color: theme.appColors.black,
        letterSpacing: '0.5px',
        textDecoration: 'none',
    },
    insideContWrapper: {
        width: '75%',
        margin: '40px 12.5% 80px',
    },
    categoryTitle: {
        lineHeight: '25px',
        fontSize: '20px',
        letterSpacing: '0.6px',
        marginTop: '60px',
        marginBottom: theme.spacing.unit * 2,
    },
    marginTop: {
        marginTop: theme.spacing.unit * 2,
    },
    linkAll: {
        display: 'inline-block',
        marginTop: theme.spacing.unit * 3,
        fontSize: theme.appFixedDimensions.fontSize.small,
        color: theme.appColors.black,
        letterSpacing: '0.4px',
        textDecoration: 'underline',
    },
    suggestionsContainer: {},
    noFoundText: {
        padding: 15,
        textAlign: 'center'
    }
});
