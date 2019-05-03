import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    paper: {
        padding: '15px',
        maxWidth: 550,
        margin: 10,
        [theme.breakpoints.up('md')]: {
            padding: '30px 40px',
        }
    }
});
