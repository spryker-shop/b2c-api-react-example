import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    addressData: {
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.medium,
        lineHeight: 2,
        letterSpacing: '0.5px',
        marginTop: theme.spacing.unit * 4,
    },
    btnRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        justifyContent: 'space-between',
    },
    chips: {
        color: theme.appColors.grey,
        borderColor: theme.appColors.grey,
        borderRadius: 2,
        textTransform: 'uppercase',
        marginRight: theme.spacing.unit * 2,
    },
});
