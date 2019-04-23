import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 150,
        margin: '0 -25px'
    },
    colSidebar: {
        width: '29%',
        padding: '0 25px'
    },
    colContent: {
        width: '71%',
        padding: '0 25px'
    }
});
