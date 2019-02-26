import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    customerContainer: {
        padding: '1.875rem 0 2.5rem',
        [theme.breakpoints.up('lg')]: {
            padding: '3.875rem 0 5rem'
        }
    },
    rightPart: {
        maxWidth: theme.appFixedDimensions.customerSubPageWidth,
        marginLeft: 'auto',

        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing.unit * 2,
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            marginTop: theme.spacing.unit * 2,
            paddingLeft: 0,
        }
    },
});
