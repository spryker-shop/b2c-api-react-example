import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    item: {
        pointerEvents: 'none'
    },
    itemActive: {
        color: 'green'
    },
    itemPassed: {
        color: 'red',
        pointerEvents: 'auto'
    },
    link: {}
});
