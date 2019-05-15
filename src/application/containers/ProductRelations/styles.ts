import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    title: {
        textAlign: 'center',
        paddingBottom: 15,
        fontSize: 20,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 20
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 30,
            paddingBottom: 40
        }
    },
    slider: {}
});
