import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    section: {
        marginTop: theme.spacing.unit * 4,
    },
    sectionTitle: {
        color: theme.appColors.black,
        fontSize: '20px',
        marginBottom: theme.spacing.unit,
    },
    warningTitle: {
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '-0.4px',
        lineHeight: 1.6,
        marginBottom: theme.spacing.unit * 1.5,
        marginTop: theme.spacing.unit * 2,
    },
    deleteBtn: {
        height: '32px',
        backgroundColor: '#b12704',
        fontSize: '10px',
        fontWeight: 'bold',
        lineHeight: 1.2,
        letterSpacing: '1px',
        color: '#ffffff',
        marginBottom: theme.spacing.unit * 2,
        padding: 0,
    }
});
