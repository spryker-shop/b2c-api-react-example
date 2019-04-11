import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        display: 'flex',
        padding: 50,
        background: theme.appColors.white,
        minHeight: 775,
        marginBottom: 20,
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: 90,
            bottom: 90,
            width: 1,
            background: theme.appColors.weekWhite
        }
    },
    grid: {
        width: 'auto',
        margin: -50
    },
    col: {
        padding: 50
    },
    title: {
        paddingBottom: 10
    },
    subheading: {
        marginBottom: 25,
        lineHeight: 1.9,
        minHeight: 50
    },
    secure: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: theme.appColors.lightGrey
    },
    secureIcon: {
        fill: 'currentColor',
        width: 13,
        height: 17
    },
    secureText: {
        fontSize: 14,
        fontWeight: 500,
        paddingLeft: 9
    }
});
