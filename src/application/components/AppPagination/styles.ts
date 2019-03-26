import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        padding: 10,
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        borderTop: '1px solid rgba(206, 206, 208, 0.3)'
    },
    container: {
        display: 'flex',
        height: 'auto',
        position: 'relative',
        paddingLeft: 100,
        paddingRight: 100
    },
    item: {
        display: 'block',
        margin: '0 5px',
        padding: 0,
        maxWidth: 'auto',
        minWidth: 0,
        flex: 'initial',
        '&$selected': {
            paddingTop: 0
        }
    },
    itemKeys: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            position: 'static'
        }
    },
    itemLeft: {
        left: 0,
    },
    itemRight: {
        right: 0,
    },
    label: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 50,
        height: 50,
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.2,
        borderRadius: 4,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
        '&$selected': {
            background: theme.appColors.weekWhite
        }
    },
    labelKeys: {
        padding: 0,
        width: 'auto',
        height: 'auto',
        fontSize: 16
    },
    selected: {}
});
