import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20,
    },
    submit: {
        width: '100%',
        marginBottom: 15,
        [theme.breakpoints.up('lg')]: {
            minWidth: 160,
            width: 'auto'
        }
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column-reverse',
        paddingTop: 10,
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row'
        }
    },
    back: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        textDecoration: 'none',
        padding: '15px 0',
        '&:hover': {
            color: theme.appColors.grey
        }
    },
    icon: {
        width: 8,
        height: 14,
        stroke: 'currentColor',
        lineHeight: 0,
        marginRight: 16
    }
});
