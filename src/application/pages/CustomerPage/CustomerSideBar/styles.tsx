import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 20
    },
    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        borderRadius: 4,
        background: theme.appColors.weekWhite
    },
    item: {},
    link: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 60,
        padding: '10px 15px 10px 34px',
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: 0.2,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        textDecoration: 'none',
        '&:after': {
            content: '""',
            position: 'absolute',
            right: 0,
            left: 0,
            height: '100%',
            width: 4,
            background: theme.appColors.blue,
            transition: 'opacity 0.3s ease-in-out',
            opacity: 0
        },
        '&:hover': {
            color: theme.appColors.black,
        }
    },
    linkSelected: {
        background: theme.appColors.white,
        color: theme.appColors.black,
        boxShadow: '0 6px 10px 0 rgba(216, 216, 216, 0.5)',
        '&:after': {
            opacity: 1
        }
    },
    icon: {
        fill: theme.appColors.grey,
        width: 22,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingLeft: 19
    }
});
