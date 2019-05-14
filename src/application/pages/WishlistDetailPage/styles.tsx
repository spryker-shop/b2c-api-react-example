import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20,
        fontSize: 20,
        lineHeight: 1.4,
        [theme.breakpoints.up('lg')]: {
            lineHeight: 1.7,
            fontSize: 30
        }
    },
    amount: {
        height: 28,
        padding: '5px 14px',
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        flexShrink: 0,
        [theme.breakpoints.up('lg')]: {
            marginTop: 13
        }
    }
});
