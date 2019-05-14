import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 40,
        margin: '0 -25px',
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 60
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 110
        }
    },
    colSidebar: {
        width: '100%',
        padding: '0 9px',

        [theme.breakpoints.up('md')]: {
            width: '29%',
            padding: '0 10px 0 25px',
        },

        [theme.breakpoints.up('lg')]: {
            padding: '0 25px',
        }
    },
    colContent: {
        width: '100%',
        padding: '0 25px',

        [theme.breakpoints.up('md')]: {
            width: '71%',
            padding: '0 25px 0 10px',
        },

        [theme.breakpoints.up('lg')]: {
            padding: '0 25px',
        }
    }
});
