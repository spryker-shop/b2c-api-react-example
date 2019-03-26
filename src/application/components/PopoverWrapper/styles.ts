import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    popover: {
        fontFamily: 'Circular',
        '& > :first-child': {},
    },
    content: {
        borderRadius: 0,
        overflow: 'visible',
    }
});
