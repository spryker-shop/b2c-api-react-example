import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        display: 'block',
        marginRight: 8,
    },
    logoCopy: {
        color: theme.appColors.black,
        fontSize: '14px',
        lineHeight: '18px',
        opacity: .4,
    },
});
