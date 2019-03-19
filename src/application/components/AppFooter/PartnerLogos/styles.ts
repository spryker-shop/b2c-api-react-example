import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    logosList: {
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
            textAlign: 'center',
        },
    },
    logosListItem: {
        margin: '0 14px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '10px 0',
        },
    },
});
