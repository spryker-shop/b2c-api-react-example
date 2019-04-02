import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    logo: {
        display: 'block',
        lineHeight: 0
    },
    logoCopy: {
        color: theme.appColors.black,
        fontSize: '14px',
        lineHeight: '18px',
        opacity: 0.4
    },
    mainLogo: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    additionalLogo: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
});
