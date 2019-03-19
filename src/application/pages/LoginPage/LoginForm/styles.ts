import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit * 2,
        width: '50%',
        minWidth: '300px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    email: {
        marginLeft: '5%',
        width: '90%',
    },
    input: {},
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
        width: '100%',
    },
    menu: {
        width: 200,
    },
    forgot: {
        width: '75%',
        padding: theme.spacing.unit * 2,
    },
    passwordButtons: {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0px`,
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '0',
        right: '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        color: '#111111',
        opacity: 0.43
    },
    filled: {
        display: 'none'
    }
});
