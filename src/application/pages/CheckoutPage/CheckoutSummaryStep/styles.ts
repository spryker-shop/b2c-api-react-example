import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    block: {
        padding: 30,
        background: theme.appColors.white,
        marginBottom: 20
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    link: {
        width: 40,
        height: 40,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: theme.appColors.weekWhite,
        transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
        color: theme.appColors.weakGrey,
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.blue,
            background: 'rgba(8, 148, 161, 0.1)'
        }
    },
    linkIcon: {
        width: 16,
        height: 16,
        fill: 'currentColor',
        lineHeight: 0
    },
});
