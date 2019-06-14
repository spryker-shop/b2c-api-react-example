import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    logosList: {
        display: 'flex',
        alignItems: 'flex-start',
        listStyle: 'none',
        margin: '0 -10px -14px',
        padding: 0,
        justifyContent: 'space-between',
        paddingBottom: 19,
        flexWrap: 'wrap',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: 0
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 -14px',
            justifyContent: 'flex-start'
        }
    },
    logosListItem: {
        padding: '0 10px 14px',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 14,
            paddingRight: 14
        }
    }
});
