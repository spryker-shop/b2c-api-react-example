import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        paddingBottom: 130
    },
    productMain: {
        paddingBottom: 40,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 60
        }
    },
    productPreview: {
        margin: '0 -16px',
        paddingBottom: 12,
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            paddingBottom: 0,
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: 12
        }
    },
    productContent: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 12
        }
    }
});
