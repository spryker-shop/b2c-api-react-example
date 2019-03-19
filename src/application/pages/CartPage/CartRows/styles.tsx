import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    listTitle: {
        width: '100%',
        height: '18px',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        letterSpacing: '0.2px',
        color: theme.appColors.grey,
    },
    itemImage: {
        width: '20%'
    },
    itemWrapper: {
        width: '40%',
        paddingLeft: theme.spacing.unit * 3,
    },
    quantityForm: {
        width: '20%',
        paddingLeft: 'calc(20% - 60px)',
    },
    priceWrapper: {
        width: '20%',
        textAlign: 'right',
        paddingRight: theme.spacing.unit * 3,
    }
});
